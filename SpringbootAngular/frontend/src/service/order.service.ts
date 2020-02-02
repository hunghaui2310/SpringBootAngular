import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../model/order';
import {config} from '../app-config/application.config';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderId: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  orderId$: Observable<any> = this.orderId.asObservable();

  setOrderId(service: any) {
    this.orderId.next(service);
  }

  showDataOrder(order: Order) {
    return this.http.post(config.data_order_API, order);
  }

  updateOrderAPI(order: Order): Observable<any> {
    return this.http.post<any>(config.update_order_API, order);
  }

  confirmOrderAPI(order: Order) {
    return this.http.post(config.confirm_order_API, order);
  }
}
