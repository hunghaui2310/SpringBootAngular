import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../app-config/application.config';
import {Cart} from '../../model/cart';
import {User} from '../../model/model.user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

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

  updateNumCartAPI(cart : Cart) {
    return this.http.post(config.update_num_cart_API, cart);
  }
}
