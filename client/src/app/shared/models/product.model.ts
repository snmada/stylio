export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    subcategory_id: string;
    color: {           
        id: string;
        name: string;
        hex_code: string;
    };
}