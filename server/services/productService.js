import { findAllProductsBySubcategoryId } from "../repositories/productRepository.js";

export const fetchProductsBySubcategoryId = async (subcategoryId, pageIndex, pageSize, sortParam, colors, priceRange) => {
    try {
        const { products, totalCount } = await findAllProductsBySubcategoryId(
            subcategoryId,
            pageIndex,
            pageSize,
            sortParam,
            colors,
            priceRange
        );
    
        return { products, totalCount };
    } catch (error) {
        throw new Error(error.message || "Failed to fetch products");
    }
};