import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../model/product';
import {SearchRequest} from '../model/search.request';
import {config} from '../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  service: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  service$: Observable<any> = this.service.asObservable();

  id: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  id$: Observable<any> = this.id.asObservable();

  setService(service: any) {
    this.service.next(service);
  }

  setId(id: any) {
    this.id.next(id);
  }
  productAPI(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(config.product_API);
  }

  search(searchModel: SearchRequest) {
    return this.http.post(config.search_product, searchModel);
  }

  productDetailAPI(productId: Product) {
    return this.http.get<Product[]>(config.product_detail + '/' + productId);
  }

  productCateAPI(categoryId: number) {
    return this.http.get<Product[]>(config.product_cate_API + '/' + categoryId);
  }

  sameProAPI(categoryId: number) {
    return this.http.get(config.same_product_API + '/' + categoryId);
  }

  productQuickViewAPI(proId: Product) {
    return this.http.post(config.product_quick_view_API, proId);
  }

  showComment(productId: Product) {
    return this.http.post(config.show_comment_product_API, productId);
  }
}
