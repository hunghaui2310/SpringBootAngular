import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../../model/cart';
import {config} from '../../app-routing/application.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCartAPI(userId: number) {
    // @ts-ignore
    return this.http.post<Cart[]>(config.add_cart, userId);
  }
}
