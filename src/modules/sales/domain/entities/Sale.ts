import { SaleStatus } from '@prisma/client';
import { v4 as uuid } from 'uuid';

interface ISale {
  id?: string;
  transaction: string;
  user_id: string;
  client_id: string | null;
  product_id: string;
  quantity: number;
  total_price: any;
  created_at?: Date;
  updated_at?: Date;
}

class SaleEntity {
  id: string;
  transaction: string;
  user_id: string;
  client_id: string | null;
  product_id: string;
  quantity: number;
  total_price: any;
  status: SaleStatus;
  created_at: Date;
  updated_at: Date;

  constructor(data: ISale) {
    this.id = uuid();
    this.transaction = data.transaction;
    this.user_id = data.user_id;
    this.client_id = data.client_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.total_price = data.total_price;
    this.status = 'pending';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { SaleEntity };
