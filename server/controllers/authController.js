import { register, login } from "../services/authService.js";

export const registerUser = async (req, res) => {
    try {
        const user = await register(req.body);
        const token = await login({ email: user.email, password: req.body.password });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 8 * 60 * 60 * 1000
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const token = await login(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 8 * 60 * 60 * 1000
        });
        
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(200).json({ message: "Logged out" });
};