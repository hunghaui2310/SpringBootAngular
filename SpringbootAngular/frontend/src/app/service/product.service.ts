import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {config} from '../../app-routing/application.config';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  productAPI(): Observable<Product[]> {
    return this.http.get<Product[]>(config.product_API);
  }

  proDetailAPI(id: number) {
    // @ts-ignore
    return this.http.get<Product[]>(config.product_detail + '/' + id);
  }
}
