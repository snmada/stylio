import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { checkAuth } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);

export default router;