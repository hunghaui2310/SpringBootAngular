import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {config} from '../../app-config/application.config';
import {SearchRequest} from '../../model/search.request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  service: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  service$: Observable<any> = this.service.asObservable();

  setService(service: any) {
    this.service.next(service);
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

  sameProAPI(categoryId: SearchRequest) {
    return this.http.post<Product[]>(config.same_product_API, categoryId);
  }
}
