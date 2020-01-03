export class SearchRequest {
  productId: number;
  productName: string;
  categoryId: number;
  price: number;

  constructor(productId?: number, productName?: string, categoryId?: number, price?: number) {
    this.categoryId = productId;
    this.productName = productName;
    this.categoryId = categoryId;
    this.price = price;
  }
}
