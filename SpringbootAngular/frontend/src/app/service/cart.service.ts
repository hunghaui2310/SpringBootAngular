import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../app-config/application.config';
import {Cart} from '../../model/cart';
import {User} from '../../model/model.user';
import {Blog} from '../../model/blog';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  service: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  service$: Observable<any> = this.service.asObservable();

  setService(service: any) {
    this.service.next(service);
  }

  showCartAPI(userId: number) {
    return this.http.post(config.cart_show, userId);
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
}
