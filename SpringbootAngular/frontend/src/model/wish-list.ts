export class WishList {
  id: number;
  productId: number;
  userId: number;
  wishListId: number;

  constructor(id?: number, productId?: number, userId?: number, wishListId?: number) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.wishListId = wishListId;
  }
}
