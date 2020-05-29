import { Component, OnInit } from '@angular/core';
import {Order} from '../../../model/order';
import {OrderService} from "../../../service/order.service";
import {User} from "../../../model/model.user";

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit {

  listOrder: Order[];
  currentP = 1;
  pageSize = 10;
  currentUser: User;

  constructor(private orderService: OrderService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllOrder();
  }

  pageChange(event: number) {
    this.currentP = event;
  }

  getAllOrder() {
    const order = new Order(null, null, null, null, null, null, null, null, null, null, this.currentUser.id);
    this.orderService.getAllOrder(order).subscribe(
      (res) => {
        this.listOrder = res['data'];
      }
    );
  }
}
