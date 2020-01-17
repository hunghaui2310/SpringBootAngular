import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {Cart} from '../../../model/cart';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {

  dataCart;
  cartNum;
  productInCart: Product[];
  subtotal;
  currentUser;
  cartRequest;
  notification;

  constructor(private cartService: CartService,
              private toastr: ToastrService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showProInCart();
  }

  showProInCart() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      dataCarts => {
        this.dataCart = dataCarts['data'];
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        console.log('proInCart', this.productInCart);
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }

  removeProInCart(proId: number) {
    this.cartRequest = new Cart(this.currentUser.id, proId);
    console.log('removeUserId', this.currentUser.id);
    console.log('proId', proId);
    this.cartService.removeProCartAPI(this.cartRequest).subscribe(
      removes => {
        this.notification = removes['data'];
        this.notificationSuccess(this.notification);
        console.log('notification', this.notification);
      },
      error => this.notificationError()
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError() {
    this.toastr.error('Lỗi', 'Thông báo');
  }

  updateNumCart(productId: number) {

  }
}
