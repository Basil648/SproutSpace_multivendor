import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("registerUserId");

    try {
      const res = await api.post("/auth/verify-otp", {
        userId,
        otp
      });

      alert("Email verified! You can now login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
