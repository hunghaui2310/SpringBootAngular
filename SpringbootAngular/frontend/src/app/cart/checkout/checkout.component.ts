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
    this.getDataUser();
    this.fetchOrderCode();
  }

  dataCheckOut() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    console.log('userIdssss', this.currentUser.id);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      dataInCart => {
        this.dataCart = dataInCart['data'];
        console.log('proInCartfdasdas', dataInCart);
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        console.log('proInCart', this.productInCart);
        this.subtotal = this.dataCart['subtotal'];
      }
    );
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
