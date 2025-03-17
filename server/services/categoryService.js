import { findAllCategories } from "../repositories/categoryRepository.js";

export const fetchCategories = async () => {
    try {
        const categories = await findAllCategories();
        
        if (!categories.length) {
            throw new Error("No categories found");
        }
        return categories;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch categories");
    }
};