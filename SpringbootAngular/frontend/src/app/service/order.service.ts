import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../model/order';
import {config} from '../../app-config/application.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  showDataOrder(order: Order) {
    return this.http.post(config.data_order_API, order);
  }

  updateOrderAPI(order: Order): Observable<any> {
    console.log('da  chay');
    return this.http.post<any>(config.update_order_API, order);
  }
}
