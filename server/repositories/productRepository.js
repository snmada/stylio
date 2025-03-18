import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllProductsBySubcategoryId = async (subcategoryId) => {
    return await prisma.product.findMany({
        where: {
            subcategory_id: subcategoryId,
            stock: {
                gt: 0
            }            
        }
    });
};