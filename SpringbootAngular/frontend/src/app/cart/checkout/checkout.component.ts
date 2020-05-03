import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/product';
import {ProductService} from '../../../service/product.service';
import {AccountService} from '../../../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../service/cart.service';
import {OrderService} from '../../../service/order.service';
import {User} from '../../../model/model.user';
import {Order} from '../../../model/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  currentUser;
  cartNum;
  productInCart: Product[];
  dataCart;
  subtotal;
  conditionUser;
  dataUsers;
  firstName;
  lastName;
  phoneNumber;
  city;
  email;
  address;
  notes;
  id;
  orderCode;
  total;

  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private router: Router,
              private accountService: AccountService,
              private productService: ProductService,
              private orderService: OrderService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dataCheckOut();
    if (localStorage.getItem('currentUser')) {
      this.getDataUser();
      this.fetchOrderCode();
    }
  }

  dataCheckOut() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
      this.cartService.getNumCartAPI(this.currentUser).subscribe(
        dataInCart => {
          this.dataCart = dataInCart['data'];
          this.cartNum = this.dataCart['numCart'];
          this.productInCart = this.dataCart['productDTOList'];
          this.subtotal = this.dataCart['subtotal'];
        }
      );
    } else if (localStorage.getItem('product')) {
      this.productInCart = JSON.parse(localStorage.getItem('product'));
      for (const product of this.productInCart) {
        console.log(product);
        this.total = 1 * product['price'];
      }
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, '', {
      timeOut: 500, positionClass: 'toast-top-center'});
    this.router.navigate(['/order-info']);
  }

  showError(message: string) {
    this.toastr.error(message, 'Thông báo', {
    });
  }

  getDataUser() {
    this.conditionUser = new User(this.currentUser.id);
    console.log('conditionUser', this.conditionUser);
    this.accountService.getDataUser(this.conditionUser).subscribe(
      dataUser => {
        this.dataUsers = dataUser['data'];
        console.log('dataUsers', this.dataUsers);
        this.firstName = this.dataUsers['firstName'];
        this.lastName = this.dataUsers['lastName'];
        this.email = this.dataUsers['email'];
      }
    );
  }

  checkOut() {
    this.conditionUser = new Order(null, this.notes, null,
      this.currentUser.id, this.lastName, this.firstName, this.address,
      this.phoneNumber, this.city);
    // console.log('this.lastName', this.lastName);
    console.log('this.orderuuu', this.conditionUser);
    this.orderService.updateOrderAPI(this.conditionUser).subscribe(
      dataUpdateOrder => {
        console.log('dataOrderdddddd', dataUpdateOrder);
        this.id = dataUpdateOrder['data'];
        this.productService.setId(this.id);
        console.log('dataOrderdddddd', dataUpdateOrder);
        this.showSuccess('Xác nhận thông tin thành công!');
      }, error => this.showError('Lỗi')
    );
    console.log('ket thuc');
  }

  fetchOrderCode() {
    this.cartService.orderCode$.subscribe(
      dataFetch => {
        console.log('dataFetchOrderCode', dataFetch);
        this.orderCode = dataFetch;
      });
  }

}
