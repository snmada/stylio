import { fetchProductsBySubcategoryId } from "../services/productService.js";

export const getProductsBySubcategoryId = async (req, res) => {
    const { subcategoryId } = req.params;
    const pageIndex = parseInt(req.query.pageIndex, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const sortParam = req.query.sortParam;

    const colorFilter = req.query.colors ? req.query.colors.split(',') : [];
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice, 10) : 0;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice, 10) : 1000;

    try {
        const { products, totalCount } = await fetchProductsBySubcategoryId(
            subcategoryId,
            pageIndex,
            pageSize,
            sortParam,
            colorFilter,
            { minPrice, maxPrice }
        );
        
        res.json({ products, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};