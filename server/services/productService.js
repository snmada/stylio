import { findAllProductsBySubcategoryId } from "../repositories/productRepository.js";

export const fetchProductsBySubcategoryId = async (subcategoryId, pageIndex, pageSize, sortParam) => {
    try {
        const { products, totalCount } = await findAllProductsBySubcategoryId(subcategoryId, pageIndex, pageSize, sortParam);
        
        if (!products.length) {
            throw new Error("No products found");
        }
        return { products, totalCount };
    } catch (error) {
        throw new Error(error.message || "Failed to fetch products");
    }
};