import express from "express";
import { getProductsBySubcategoryId } from "../controllers/productController.js";

const router = express.Router();

router.get("/subcategory/:subcategoryId", getProductsBySubcategoryId);

export default router;