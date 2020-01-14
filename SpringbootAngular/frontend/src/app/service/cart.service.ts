import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../app-config/application.config';
import {Cart} from '../../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  showCartAPI(userId: number) {
    return this.http.post(config.cart_show, userId);
  }

  getNumCartAPI(userId: Cart) {
    return this.http.post(config.get_num_cart, userId);
  }
}
