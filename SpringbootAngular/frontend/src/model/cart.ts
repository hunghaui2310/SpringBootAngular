export class Cart {
  userId: number;
  productId: number;
  cartNum?: number;
  click?: boolean;
  loadData?: string;

  constructor(userId?: number, productId?: number, cartNum?: number, click?: boolean, loadData?: string) {
    this.userId = userId;
    this.productId = productId;
    this.cartNum = cartNum;
    this.click = click;
    this.loadData = loadData;
  }
}
