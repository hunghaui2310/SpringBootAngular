import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app-config/application.config';
import {Cart} from '../model/cart';
import {Observable} from 'rxjs';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  blogDetailAPI(blogId: number) {
    return this.http.get(config.blog_detail_API + '/' + blogId);
  }

  getBlogAPI() {
    return this.http.get(config.blog_API);
  }

  getDataInAbout() {
    return this.http.get(config.about_API);
  }

  addCompareAPI(cart: Cart) {
    return this.http.post(config.add_compare_API, cart);
  }

  showCompareAPI(cart: Cart) {
    return this.http.post(config.show_compare_API, cart);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(config.category_API);
  }
}
