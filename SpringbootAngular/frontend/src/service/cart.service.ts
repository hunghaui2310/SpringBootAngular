import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/model.user';
import {config} from '../app-config/application.config';
import {Cart} from '../model/cart';
import {Blog} from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  orderCode: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderCode$: Observable<any> = this.orderCode.asObservable();

  numCart: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  numCart$: Observable<any> = this.numCart.asObservable();

  setOrderCode(orderCode: any) {
    this.orderCode.next(orderCode);
  }

  setNumCart(numCart: any) {
    this.numCart.next(numCart);
  }

  getNumCartAPI(userId: User) {
    return this.http.post(config.get_num_cart, userId);
  }

  removeProCartAPI(cart: Cart) {
    return this.http.post(config.remove_cart, cart);
  }

  addCartAPI(cart: Cart) {
    return this.http.post(config.add_cart, cart);
  }

  updateNumCartAPI(cart: Cart) {
    return this.http.post(config.update_num_cart_API, cart);
  }

  codeDiscountAPI(blog: Blog) {
    return this.http.post(config.cart_discount_API, blog);
  }

  getAndUpdate(cart: Cart) {
    return this.http.post(config.get_and_update_cartNum_API, cart);
  }
}
