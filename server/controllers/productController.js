import { fetchProductsBySubcategoryId } from "../services/productService.js";

export const getProductsBySubcategoryId = async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        const products = await fetchProductsBySubcategoryId(subcategoryId);
        
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};