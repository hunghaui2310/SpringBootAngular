export class Product {
  id: number;
  productName: string;
  price: number;
  numLike: number;
  discount: number;
  urlImage: string;
  realPrice: number;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, productName?: string, price?: number, numLike?: number, discount?: number, urlImage?: string, realPrice?: number) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.numLike = numLike;
    this.discount = discount;
    this.urlImage = urlImage;
    this.realPrice = realPrice;
  }
}
