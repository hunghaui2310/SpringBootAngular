import { Component, OnInit } from '@angular/core';
import {OtherService} from '../../service/other.service';
import {Cart} from '../../../model/cart';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../../model/product';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  comPareRequest;
  currentUser;
  dataCompare: Product[];
  conditionAddCart;
  notificationMessage;

  constructor(private compareService: OtherService,
              private toastr: ToastrService,
              private cartService: CartService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showCompare();
  }

  showCompare() {
    this.comPareRequest = new Cart(this.currentUser.id, null);
    this.compareService.showCompareAPI(this.comPareRequest).subscribe(
      data => {
        this.dataCompare = data['data']['list'];
        console.log('dataCompare', this.dataCompare);
      }
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationError() {
    this.toastr.error('Lỗi', 'Thông báo');
  }

  addProToCart(productId: number) {
    this.conditionAddCart = new Cart(this.currentUser.id, productId);
    console.log('this.currentUser.id', this.conditionAddCart);
    this.cartService.addCartAPI(this.conditionAddCart).subscribe(
      message => {
        this.notificationMessage = message['data'];
        console.log('this.notificationMessage', this.notificationMessage);
        this.notificationSuccess('Thêm thành công');
      },
      error => this.notificationError()
    );
  }
}
