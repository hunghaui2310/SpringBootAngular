import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {config} from '../../app-config/application.config';
import {HomeService} from './home.service';
import {SearchRequest} from '../../model/search.request';
import {MatDialog} from '@angular/material';
import {QuickViewComponent} from '../product/quick-view/quick-view.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  service: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  service$: Observable<any> = this.service.asObservable();

  setService(service: any) {
    this.service.next(service);
  }

  productAPI(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(config.product_API);
  }

  productDetailAPI(productId: Product) {
    return this.http.get<Product[]>(config.product_detail + '/' + productId);
  }
}
