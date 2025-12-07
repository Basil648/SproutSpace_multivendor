import express from "express";
import upload from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

import {
    createProduct,
    getAllProducts,
    getMyProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", auth(["vendor"]), upload.single("image"), createProduct);
router.get("/my", auth(["vendor"]), getMyProducts);
router.put("/:id", auth(["vendor"]), upload.single("image"), updateProduct);
router.delete("/:id", auth(["vendor"]), deleteProduct);

export default router;
