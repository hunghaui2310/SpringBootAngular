import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {ProductService} from '../../../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../../service/order.service';
import {Order} from '../../../model/order';
import {User} from '../../../model/model.user';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../service/account.service";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
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
  dataCart;
  productInCart: Product[];
  subtotal;
  codeDiscount;
  message;
  user = new User();
  order = new Order();
  conditionUser;
  dataUsers;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private productService: ProductService,
              private accountService: AccountService,
              private toastr: ToastrService,
              private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  ngOnInit() {
    this.orderCode = sessionStorage.getItem('orderCode');
    this.fetchOrderCode();
    this.showDataOrder();
    this.dataProductOrder();
    if (this.codeDiscount.length === 0) {
      this.codeDiscount = null;
    }
  }

  showDataOrder() {
    if (localStorage.getItem('currentUser')) {
      this.condition = new Order(null, null, this.orderCode);
      console.log('request', this.condition);
      this.orderService.showDataOrder(this.condition).subscribe(
        data => {
          console.log(data);
          this.dataOrder = data['data'];
          this.address = this.dataOrder['address'];
          this.phoneNumber = this.dataOrder['phoneNumber'];
          this.email = this.dataOrder['email'];
          this.fullName = this.dataOrder['fullName'];
          this.orderCode = this.orderCode;
          this.createDate = this.dataOrder['createDate'];
          this.city = this.dataOrder['city'];
          this.notes = this.dataOrder['notes'];
        }
      );
    } else if (sessionStorage.getItem('userInSession')) {
      this.user = JSON.parse(sessionStorage.getItem('userInSession'));
      this.address = this.user[0].address;
      this.phoneNumber = this.user[0].phoneNumber;
      this.fullName = this.user[0].lastName + ' ' + this.user[0].firstName;
      this.email = this.user[0].email;
    }
  }

  dataProductOrder() {
    if (localStorage.getItem('currentUser')) {
      if (sessionStorage.getItem('productBuyNow')) {
        this.productInCart = JSON.parse(sessionStorage.getItem('productBuyNow'));
        console.log(this.productInCart);
        for (const product of this.productInCart) {
          this.subtotal = product['realPrice'] * product['numProInCart'];
        }
      } else {
        this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
        this.cartService.getNumCartAPI(this.currentUser).subscribe(
          dataInCart => {
            this.dataCart = dataInCart['data'];
            this.productInCart = this.dataCart['productDTOList'];
            this.subtotal = this.dataCart['subtotal'];
          }
        );
      }
    } else if (sessionStorage.getItem('userInSession')) {
      const productInSession = JSON.parse(sessionStorage.getItem('productBuyNow'));
      for (let i = 0; i < productInSession.length; i++) {
        this.subtotal = productInSession[i]['realPrice'] * productInSession[i]['numProInCart'];
      }
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Lỗi', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  fetchOrderCode() {
    this.cartService.orderCode$.subscribe(
      dataFetch => {
        this.codeDiscount = dataFetch;
      });
  }

  confirmOrderByUser() {
    this.condition = new Order(null, null, this.orderCode);
    this.orderService.updateOrderAPI(this.condition).subscribe(
      (res) => {
        if (res['code'] == 200) {
          this.notificationSuccess('Đặt hàng thành công');
          setTimeout(function success() {
            if (localStorage.getItem('currentUser')) {
              window.location.replace('/order-user');
            } else {
              window.location.replace('/home');
            }
          }, 1500);
        }
      }
    )
  }

  deleteOrder() {
    const req = new Order(null, null, this.orderCode);
    this.orderService.deleteOrderAPI(req).subscribe(
      (res) => {
        if (res['code'] == 200) {
          this.notificationSuccess('Đã hủy đơn hàng');
          setTimeout(function success() {
            window.location.replace('/home');
          }, 1500);
        }
      }
    );
  }

}
