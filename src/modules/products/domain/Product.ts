import { v4 as uuid } from 'uuid';

interface IProduct {
  name: string;
  description: string;
  price: any;
}

class ProductEntity {
  id: string;
  name: string;
  description: string;
  price: any;
  created_at: Date;
  updated_at: Date;

  constructor(data: IProduct) {
    this.id = uuid();
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { ProductEntity };
