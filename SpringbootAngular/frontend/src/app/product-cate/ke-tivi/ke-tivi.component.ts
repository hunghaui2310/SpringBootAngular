import { Component, OnInit } from '@angular/core';
import {SearchRequest} from '../../../model/search.request';
import {Cart} from '../../../model/cart';
import {User} from '../../../model/model.user';
import {Product} from '../../../model/product';
import {sort, Sort} from '../../../model/sort';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {ToastrService} from 'ngx-toastr';
import {OtherService} from '../../../service/other.service';

@Component({
  selector: 'app-ke-tivi',
  templateUrl: './ke-tivi.component.html',
  styleUrls: ['./ke-tivi.component.scss']
})
export class KeTiviComponent implements OnInit {

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
    this.productService.productCateAPI(4).subscribe(
      data => {
        this.productDTOList = data['data'];
        console.log('listDataProCate', this.productDTOList);
      }
    );
  }

  search() {
    this.searchRequest = new SearchRequest(null, null, 4, this.sortCondition);
    console.log('search', this.searchRequest);
    this.productService.search(this.searchRequest).subscribe(
      dataSerach => {
        console.log(dataSerach['data']);
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
    console.log('this.currentUser.id', this.currentUser.id);
    console.log('productIdToAddCart', productId);
    this.cartService.addCartAPI(this.conditionAddCart).subscribe(
      message => {
        this.notificationMessage = message['data'];
        console.log('this.notificationMessage', this.notificationMessage);
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
    console.log('compareRequest', this.comPareRequest);
    this.compareService.addCompareAPI(this.comPareRequest).subscribe(
      dataCompare => {
        this.notificationMessage = dataCompare['data'];
        console.log('qqqqqqqqMessage', this.notificationMessage);
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
