import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
	const payload = {
        id: user.id,
        email: user.email
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
};

export const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};