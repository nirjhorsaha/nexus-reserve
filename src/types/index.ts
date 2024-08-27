export interface Product {
    _id?: number;
    name: string;
    price: number;
    brand: string;
    description: string;
    quantity: number;
    rating: number;
    imageUrl: string;
    isDeleted: boolean;
    inStock: boolean;
}

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    brand: string;
    stock: number;
    quantity: number; 
    cartQuantity: number; // New field
}
