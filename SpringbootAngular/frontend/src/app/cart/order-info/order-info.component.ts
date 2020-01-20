import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../../model/order';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  id;
  currentUser;
  condition;
  fullName;
  email;
  phoneNumber;
  dataOrder;
  orderCode;
  address;
  createDate;
  city;
  notes;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showDataOrder();
  }

  showDataOrder() {
      this.condition = new Order(this.id, null, null, this.currentUser.id);
      console.log('condition', this.condition);
      this.orderService.showDataOrder(this.condition).subscribe(
        data => {
          this.dataOrder = data['data'];
          console.log('dataOrder', this.dataOrder);
          this.address = this.dataOrder['address'];
          this.phoneNumber = this.dataOrder['phoneNumber'];
          this.email = this.dataOrder['email'];
          this.fullName = this.dataOrder['fullName'];
          this.orderCode = this.dataOrder['orderCode'];
          this.createDate = this.dataOrder['createDate'];
          this.city = this.dataOrder['city'];
          this.notes = this.dataOrder['notes'];
        }
      );
  }
}
