import { Supplier } from './supplier';

export class Product {

    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;

    supplier: Supplier;
    
}
