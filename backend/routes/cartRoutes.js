import express from "express";
import { auth } from "../middleware/auth.js";
import { addToCart, getCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", auth(["customer"]), addToCart);
router.get("/", auth(["customer"]), getCart);
router.delete("/", auth(["customer"]), clearCart);

export default router;
