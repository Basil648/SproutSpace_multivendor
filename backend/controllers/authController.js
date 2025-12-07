import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import transporter from "../config/email.js";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Check existing user
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already in use" });

        const hashed = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000;

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            phone,
            otp,
            otpExpires,
        });

        // SEND OTP EMAIL
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification OTP",
            text: `Your OTP is: ${otp}`,
        });

        res.status(201).json({
            message: "OTP sent to email",
            userId: user._id,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpires < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Email verified" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        if (!user.isVerified)
            return res.status(400).json({ message: "Email not verified" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            message: "Login successful",
            token: generateToken(user),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
