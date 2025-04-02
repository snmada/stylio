import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (userData) => {
    return await prisma.user.create({ data: userData });
};

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            shippingAddress: {
                select: {
                    addressLine1: true,
                    addressLine2: true,
                    city: true,
                    country: true,
                    postalCode: true
                }
            }
        }
    });
};

export const updateUser = async (userId, userData) => {
    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { shippingAddressId: true }
    });

    if (!existingUser) {
        throw new Error("User not found");
    }
  
    let updatedUser;
  
    if (existingUser.shippingAddressId) {
        updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                shippingAddress: {
                    update: {
                        addressLine1: userData.shippingAddress.addressLine1,
                        addressLine2: userData.shippingAddress.addressLine2,
                        city: userData.shippingAddress.city,
                        country: userData.shippingAddress.country,
                        postalCode: userData.shippingAddress.postalCode
                    }
                }
            }
        });
    } else {
        updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                shippingAddress: {
                    create: {
                        addressLine1: userData.shippingAddress.addressLine1,
                        addressLine2: userData.shippingAddress.addressLine2,
                        city: userData.shippingAddress.city,
                        country: userData.shippingAddress.country,
                        postalCode: userData.shippingAddress.postalCode
                    }
                }
            }
        });
    }
};