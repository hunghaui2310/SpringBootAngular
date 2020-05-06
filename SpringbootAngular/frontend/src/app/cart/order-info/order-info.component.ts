import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {ProductService} from '../../../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../../service/order.service';
import {Order} from '../../../model/order';
import {User} from '../../../model/model.user';

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

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fetchOrderCode();
    this.showDataOrder();
    this.dataProductOrder();
    this.orderCode = 'HD-' + Math.random().toString(36).substr(2, 9);
    if (this.codeDiscount.length === 0) {
      this.codeDiscount = null;
    }
  }

  showDataOrder() {
    if (localStorage.getItem('currentUser')) {
      this.condition = new Order(this.id, null, null, this.currentUser.id);
      this.orderService.showDataOrder(this.condition).subscribe(
        data => {
          this.dataOrder = data['data'];
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
      this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
      this.cartService.getNumCartAPI(this.currentUser).subscribe(
        dataInCart => {
          this.dataCart = dataInCart['data'];
          this.productInCart = this.dataCart['productDTOList'];
          this.subtotal = this.dataCart['subtotal'];
        }
      );
    } else if (sessionStorage.getItem('userInSession')) {
      const productInSession = JSON.parse(sessionStorage.getItem('product'));
      for (let i = 0; i < productInSession.length; i++) {
        this.subtotal = productInSession[i]['price'] * productInSession[i]['numProInCart'];
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
    if (this.id) {
      this.condition = new Order(this.id);
      this.orderService.confirmOrderAPI(this.condition).subscribe(
        dataConfirm => {
          this.message = dataConfirm['data']['message'];
          this.orderService.setOrderId(this.id);
          if (this.message === 'SUCCESS') {
            this.notificationSuccess('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất');
            setTimeout(function STO() {
              window.location.replace('/home');
            }, 2000);
          } else {
            this.notificationError('Đã xảy ra lỗi');
          }
        }
      );
    } else {
    }
  }
}
