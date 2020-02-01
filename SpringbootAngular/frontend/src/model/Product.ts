export class Product {
  id: number;
  productName: string;
  price: number;
  numLike: number;
  discount: number;
  urlImage: string;
  realPrice: number;
  categoryName: string;
  description: string;
  isNew: boolean;
  categoryId: number;
  numProInCart: number;
  total: number;
  createDate: string;
  codeDiscount: string;
  numBuy: number;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, productName?: string, price?: number, numLike?: number, discount?: number, urlImage?: string, realPrice?: number, categoryName?: string, description?: string, isNew?: boolean, categoryId?: number, numProInCart?: number, total?: number, createDate?: string, codeDiscount?: string, numBuy?: number) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.numLike = numLike;
    this.discount = discount;
    this.urlImage = urlImage;
    this.realPrice = realPrice;
    this.categoryName = categoryName;
    this.description = description;
    this.isNew = isNew;
    this.categoryId = categoryId;
    this.numProInCart = numProInCart;
    this.total = total;
    this.createDate = createDate;
    this.codeDiscount = codeDiscount;
    this.numBuy = numBuy;
  }
}
