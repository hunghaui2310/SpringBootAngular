import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {config} from '../../app-config/application.config';
import {SearchRequest} from '../../model/search.request';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(private http: HttpClient) { }

  getAllProAdminAPI(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(config.get_all_product_admin_API);
  }

  searchAdminAPI(search: SearchRequest) {
    return this.http.post(config.search_product_admin_API, search);
  }

  deleteProductAPI(productId: number) {
    console.log('da goi API xoa');
    console.log(config.delete_product_admin_API);
    return this.http.get(config.delete_product_admin_API + '/' + productId);
  }
}
