import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", checkAuth, (req, res) => res.status(200).json({ message: "Authenticated" }));
router.post("/logout", logoutUser);

export default router;