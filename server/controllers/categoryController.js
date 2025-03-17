import { fetchCategories } from "../services/categoryService.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await fetchCategories();
        
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};