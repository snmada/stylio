import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllProductsBySubcategoryId = async (subcategoryId, pageIndex, pageSize, sortParam, colors, priceRange) => {
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

    const where = {
        subcategoryId: subcategoryId,
        stock: {
            gt: 0
        },

        ...(colors.length > 0 && {
            color: {
                id: { in: colors }
            }
        }),

        ...(priceRange && {
            price: {
                gte: priceRange.minPrice,
                lte: priceRange.maxPrice
            }
        })
    };

    const products = await prisma.product.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            color: {
                select: {
                    id: true,
                    name: true,
                    hexCode: true
                }
            }
        }
    });

    const totalCount = await prisma.product.count({ where });

    return { products, totalCount };
};