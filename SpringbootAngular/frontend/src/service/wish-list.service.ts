import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WishList} from '../model/wish-list';
import {config} from '../app-config/application.config';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  numCartFetch: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  numCartFetch$: Observable<any> = this.numCartFetch.asObservable();

  constructor(private http: HttpClient) { }

  setNumCart(numCartFetch: boolean) {
    this.numCartFetch.next(numCartFetch);
  }

  insertWishListAPI(wishList: WishList) {
    return this.http.post(config.wishList_insert_API, wishList);
  }

  showAllWishListAPI(wishList: WishList) {
    return this.http.post(config.show_wish_list_API, wishList);
  }

  deleteWishListAPI(wishList: WishList) {
    return this.http.post(config.delete_wish_list_API, wishList);
  }
}
