export interface ShippingAddress {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    postalCode?: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    shippingAddress?: ShippingAddress;
}