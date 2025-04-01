export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    subcategoryId: string;
    color: {           
        id: string;
        name: string;
        hexCode: string;
    };
}