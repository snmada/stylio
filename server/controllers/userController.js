import { findUserById, updateUser } from "../repositories/userRepository.js";

export const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await findUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user profile" });
    }
};

export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;

    try {
        const updatedUser = await updateUser(userId, userData);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user profile" });
    }
};