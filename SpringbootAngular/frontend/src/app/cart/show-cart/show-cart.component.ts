import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {Cart} from '../../../model/cart';
import {ToastrService} from 'ngx-toastr';
import {Blog} from '../../../model/blog';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css'],
})
export class ShowCartComponent implements OnInit {

  dataCart;
  cartNum;
  productInCart: Product[];
  subtotal;
  currentUser;
  cartRequest;
  notification;
  codeDiscount;
  codeRequest;
  dataCode: any;
  discount;

  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showProInCart();
  }

  showProInCart() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    console.log('dataReceive', this.currentUser);
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
        this.notificationSuccess('Xóa thành công');
        this.showProInCart();
        console.log('notification', this.notification);
      },
      error => this.notificationError()
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationWarning(notification: string) {
    this.toastr.error(notification, 'Thông báo',{
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationError() {
    this.toastr.error('Lỗi', 'Thông báo');
  }

  updateNumCart(productId: number) {

  }

  getCodeDiscount(code: string) {
    this.toastr.success(':ddd', 'sss' , {
      timeOut: 10000,
      positionClass: 'toast-top-center'
    });
    this.codeRequest = new Blog(null, null, code, null, null, null);
    console.log('this.codeRequest', this.codeRequest);
    this.cartService.codeDiscountAPI(this.codeRequest).subscribe(
    dataCode => {
      this.dataCode = dataCode['data'];
      console.log('dataCode', this.dataCode);
      if (this.dataCode === 'EMPTY') {
        this.notificationWarning('Chưa nhập mã khuyến mại!');
        this.dataCode = null;
      } else if (this.dataCode === 'CODE_NOT_EXIST') {
        this.notificationWarning('Mã khuyến mại không tồn tại');
        this.dataCode = null;
      } else {
        this.discount = this.dataCode;
        console.log('dataCode', this.discount);
      }
    }, error => this.notificationError()
    );
  }
}
