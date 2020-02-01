import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(private http: HttpClient) { }

  getAllProAdminAPI(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(config.get_all_product_admin_API);
  }
}
