import { verifyToken } from "../utils/jwtUtils.js";

export const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) 
        return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};