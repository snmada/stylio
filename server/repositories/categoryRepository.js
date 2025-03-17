import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllCategories = async () => {
    return await prisma.category.findMany({
        include: { 
            subcategories: true 
        }
    });
};