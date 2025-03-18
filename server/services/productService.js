import { findAllProductsBySubcategoryId } from "../repositories/productRepository.js";

export const fetchProductsBySubcategoryId = async (subcategoryId) => {
    try {
        const products = await findAllProductsBySubcategoryId(subcategoryId);
        
        if (!products.length) {
            throw new Error("No products found");
        }
        return products;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch products");
    }
};