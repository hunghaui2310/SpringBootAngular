import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Product} from '../../../model/product';
import {SearchRequest} from '../../../model/search.request';
import {Sort, sort} from '../../../model/sort';
import {Cart} from '../../../model/cart';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {ToastrService} from 'ngx-toastr';
import {OtherService} from '../../../service/other.service';

@Component({
  selector: 'app-pro-cate',
  templateUrl: './pro-cate.component.html',
  styleUrls: ['./pro-cate.component.scss']
})
export class ProCateComponent implements OnInit {

  currentUser: User;
  sortCondition;
  productDTOList: Product[];
  searchRequest: SearchRequest;
  sortList: Sort[] = sort;
  currentP = 1;
  conditionAddCart;
  notificationMessage;
  comPareRequest;
  pageSize = 12;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private toastr: ToastrService,
              private compareService: OtherService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getDataPro();
    this.sortCondition = null;
  }

  getDataPro() {
    this.productService.productCateAPI(1).subscribe(
      data => {
        this.productDTOList = data['data'];
      }
    );
  }

  search() {
    this.searchRequest = new SearchRequest(null, null, 1, this.sortCondition);
    console.log('search', this.searchRequest);
    this.productService.search(this.searchRequest).subscribe(
      dataSerach => {
        this.productDTOList = dataSerach['data'];
      },
      error => {
        (console.log('LOI SEARCH', error));
      },
      () => {
        console.log('ok');
      }
    );
  }

  addProToCart(productId: number) {
    this.conditionAddCart = new Cart(this.currentUser.id, productId);
    this.cartService.addCartAPI(this.conditionAddCart).subscribe(
      message => {
        this.notificationMessage = message['data'];
        if (this.notificationMessage === 'CREATE' || this.notificationMessage === 'UPDATE') {
          this.notificationSuccess('Thêm thành công');
        } else {
          this.notificationError();
        }
      },
      error => this.notificationError()
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

  addProToCompare(productId: number) {
    this.comPareRequest = new Cart(this.currentUser.id, productId);
    this.compareService.addCompareAPI(this.comPareRequest).subscribe(
      dataCompare => {
        this.notificationMessage = dataCompare['data'];
        this.notificationSuccess('Thêm so sánh thành công');
      },
      error => this.notificationError()
    );
  }

  pageChange(page: number) {
    let total = this.currentP * this.pageSize;
    if (this.currentP * this.pageSize > this.productDTOList.length) {
      total = this.productDTOList.length;
    }

    this.currentP = page;
    console.log('page', this.currentP);
  }
}
