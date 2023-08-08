class StockProductEntity {
  id?: string;
  product_id: string;
  quantity: string;

  private constructor({ product_id, quantity }: StockProductEntity) {
    return Object.assign(this, {
      product_id,
      quantity,
    });
  }

  static create({ product_id, quantity }: StockProductEntity) {
    const stockProduct = new StockProductEntity({ product_id, quantity });
    return stockProduct;
  }
}

export { StockProductEntity };
