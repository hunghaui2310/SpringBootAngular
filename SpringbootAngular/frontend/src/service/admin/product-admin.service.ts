import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {config} from '../../app-config/application.config';
import {SearchRequest} from '../../model/search.request';
import {DeleteProduct} from '../../model/delete.product';
import {endWith} from 'rxjs/operators';

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

  deleteProductAPI(productId: DeleteProduct): Observable<any> {
    return this.http.post<any>(config.delete_product_admin_API, productId);
  }

  saveProduct(product: Product[]) {
    if (product[0].id === -1) {
      return this.http.post<any>(config.create_product_admin_API, product[0]);
    } else {
      return this.http.post<any>(config.update_product_admin_API, product);
    }
  }
}
