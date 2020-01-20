import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {User} from '../../../model/model.user';
import {Product} from '../../../model/product';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {Order} from '../../../model/order';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
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

  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private router: Router,
              private accountService: AccountService,
              private orderService: OrderService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dataCheckOut();
    this.getDataUser();
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
    // tslint:disable-next-line:max-line-length
    this.conditionUser = new Order(null, this.notes, null, this.currentUser.id, this.lastName, this.firstName, this.address, this.phoneNumber, this.city);
    console.log('this.order', this.conditionUser);
    this.orderService.updateOrderAPI(this.conditionUser).subscribe(
      dataUpdateOrder => {
        this.id = dataUpdateOrder['data'];
        console.log('dataOrder', this.id);
        this.showSuccess('Xác nhận thông tin! Đang chuyển hướng');
      }, error => this.showError('Lỗi')
    );
  }
}
