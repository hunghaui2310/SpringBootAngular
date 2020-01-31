import { Component, OnInit } from '@angular/core';
import {WishListService} from '../../../service/wish-list.service';
import {WishList} from '../../../model/wish-list';
import {Product} from '../../../model/product';
import {Cart} from '../../../model/cart';
import {CartService} from '../../../service/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-show-wish-list',
  templateUrl: './show-wish-list.component.html',
  styleUrls: ['./show-wish-list.component.scss']
})
export class ShowWishListComponent implements OnInit {

  currentUser;
  wishListDTO;
  wishList;
  listPro: Product[];
  conditionAddCart;
  notificationMessage;
  deleteMessage;

  constructor(private wishListService: WishListService,
              private cartService: CartService,
              private toastr: ToastrService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showAllWishList();
  }

  showAllWishList() {
    this.wishListDTO = new WishList(null, null, this.currentUser.id);
    console.log('conditionWishList', this.wishListDTO);
    this.wishListService.showAllWishListAPI(this.wishListDTO).subscribe(
      dataShow => {
        this.wishList = dataShow['data'];
        console.log('dataWishList', this.wishList);
        this.listPro = this.wishList['productDTOList'];
        console.log(this.wishList['productDTOList']);
      }
    );
  }

  addProToCart(productId: number) {
    this.conditionAddCart = new Cart(this.currentUser.id, productId);
    console.log('this.currentUser.id', this.currentUser.id);
    console.log('productIdToAddCart', productId);
    this.cartService.addCartAPI(this.conditionAddCart).subscribe(
      message => {
        this.notificationMessage = message['data'];
        console.log('this.notificationMessage', this.notificationMessage);
        if (this.notificationMessage === 'CREATE' || this.notificationMessage === 'UPDATE') {
          this.notificationSuccess('Thêm vào giỏ thành công');
        } else {
          this.notificationError('Lỗi');
        }
      },
      error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationError(messageError: string) {
    this.toastr.error(messageError, 'Thông báo');
  }

  deleteWishList(productId: number) {
    this.wishListDTO = new WishList(null, productId, this.currentUser.id);
    console.log('dataDeleteWishList', this.wishListDTO);
    this.wishListService.deleteWishListAPI(this.wishListDTO).subscribe(
      messageDelete => {
        this.deleteMessage = messageDelete['data'];
        if (this.deleteMessage === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
          this.showAllWishList();
        }
      }
    );
  }
}
