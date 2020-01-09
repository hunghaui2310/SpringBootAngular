import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {config} from '../../app-routing/application.config';
import {HomeService} from './home.service';
import {SearchRequest} from '../../model/search.request';
import {MatDialog} from '@angular/material';
import {QuickViewComponent} from '../product/quick-view/quick-view.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  productAPI(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(config.product_API);
  }
}
