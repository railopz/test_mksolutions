export default interface CreateSaleDTO {
  transaction: string;
  product_id: string;
  user_id: string;
  client_id?: string;
  quantity: number;
  total_price: number;
}
