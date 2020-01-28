import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../../model/order';
import {User} from '../../../model/model.user';
import {CartService} from '../../service/cart.service';
import {Product} from '../../../model/product';
import {ProductService} from '../../service/product.service';
import {ToastrService} from 'ngx-toastr';

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
  dataCart;
  productInCart: Product[];
  subtotal;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showDataOrder();
    this.dataProductOrder();
    this.fetchId();
    this.fetchOrderCode();
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

  dataProductOrder() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    console.log('userIdssss', this.currentUser.id);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      dataInCart => {
        this.dataCart = dataInCart['data'];
        console.log('proInCart', dataInCart);
        this.productInCart = this.dataCart['productDTOList'];
        console.log('proInCart', this.productInCart);
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }

  fetchId() {
    this.productService.id$.subscribe(
      data => {
        console.log('idFetch', data);
        this.id = data;
      }
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  fetchOrderCode() {
    this.cartService.orderCode$.subscribe(
      dataFetch => {
        console.log('dataFetchOrderCode', dataFetch);
        this.orderCode = dataFetch;
      });
  }
}