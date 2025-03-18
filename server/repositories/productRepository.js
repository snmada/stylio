import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllProductsBySubcategoryId = async (subcategoryId, pageIndex, pageSize, sortParam) => {
    let orderBy = {};

    switch (sortParam) {
        case 'name-asc':
            orderBy = { name: 'asc' };
            break;
        case 'name-desc':
            orderBy = { name: 'desc' };
            break;
        case 'price-asc':
            orderBy = { price: 'asc' };
            break;
        case 'price-desc':
            orderBy = { price: 'desc' };
            break;
        default:
            orderBy = {};
            break;
    }
    
    const products = await prisma.product.findMany({
        where: {
            subcategory_id: subcategoryId,
            stock: {
                gt: 0
            }
        },
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy
    });

    const totalCount = await prisma.product.count({
        where: {
            subcategory_id: subcategoryId,
            stock: {
                gt: 0
            }
        }
    });

    return { products, totalCount };
};