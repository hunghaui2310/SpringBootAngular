export class Cart {
  userId: number;
  productId: number;
  numCart?: number;
  click?: boolean;

  constructor(userId?: number, productId?: number, numCart?: number, click?: boolean) {
    this.userId = userId;
    this.productId = productId;
    this.numCart = numCart;
    this.click = click;
  }
}
