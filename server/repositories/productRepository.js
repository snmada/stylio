import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllProductsBySubcategoryId = async (subcategoryId, pageIndex, pageSize) => {
    const products = await prisma.product.findMany({
        where: {
            subcategory_id: subcategoryId,
            stock: {
                gt: 0
            }
        },
        skip: pageIndex * pageSize,
        take: pageSize
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