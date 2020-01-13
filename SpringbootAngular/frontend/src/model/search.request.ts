export class SearchRequest {
  productId: number;
  productName: string;
  categoryId: number;
  condition: string;

  constructor(productId?: number, productName?: string, categoryId?: number, condition?: string) {
    this.productId = productId;
    this.productName = productName;
    this.categoryId = categoryId;
    this.condition = condition;
  }
}
