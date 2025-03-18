import { fetchProductsBySubcategoryId } from "../services/productService.js";

export const getProductsBySubcategoryId = async (req, res) => {
    const { subcategoryId } = req.params;
    const pageIndex = parseInt(req.query.pageIndex, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const sortParam = req.query.sortParam;

    try {
        const { products, totalCount } = await fetchProductsBySubcategoryId(subcategoryId, pageIndex, pageSize, sortParam);
        
        res.json({ products, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};