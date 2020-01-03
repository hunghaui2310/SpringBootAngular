import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material';

import {Product} from '../../model/Product';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../service/product.service';
import {SearchRequest} from '../../model/search.request';
import {CartService} from '../service/cart.service';
import {BuyNowComponent} from './buy-now/buy-now.component';
import {HomeService} from '../service/home.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @Input() productList: Product[];

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private cartService: CartService,
    private homeService: HomeService,
    public dialog: MatDialog
  ) { }
  currentP = 1;
  mstrstatus = '';
  urlImage;
  dataTables: Product[] = [];
  productId;
  productName;
  productPrice;
  productDiscount;
  productDescription;
  categoryName;
  numLike;

  ngOnInit() {
    console.log(this.productList);
    // this.getProduct();
  }

  pageChange(page: number) {
    let total = this.currentP * 15;
    if (this.currentP * 15 > this.productList.length) {
      total = this.productList.length;
    }
    this.mstrstatus = '';
    this.currentP = page;
    console.log('page', this.currentP);
  }

  productDetail(id: number) {
    this.productService.proDetailAPI(id);
    location.replace('/product');
    console.log('productId = ', id);
  }

  addItemCart(userId: number) {
    this.cartService.addToCartAPI(userId);
    console.log('userId', userId);
  }

  showData(row: any) {
    this.productName = row['productName'];
    this.urlImage = row['urlImage'];
    this.productPrice = row['price'];
    this.productDiscount = row['realPrice'];
    this.productDescription = row['description'];
    this.categoryName = row['categoryName'];
    this.numLike = row['numLike'];

    const vdialog = this.dialog.open(BuyNowComponent, {
      data: {
        proName: this.productName,
        url: this.urlImage,
        proPrice: this.productPrice,
        proDiscount: this.productDiscount,
        proDes: this.productDescription,
        cateName: this.categoryName,
        numL: this.numLike
      }
    });
    vdialog.afterClosed().subscribe(
      result => {this.loadData();
      });
  }

  loadData() {
    const searchModel: SearchRequest = new SearchRequest(this.productId);
    console.log('search', searchModel);
    this.homeService.search(searchModel).subscribe(
      data => {
        console.log('data search: ', data['data']);
        this.dataTables = data['data'];
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.productList) {
    } else {
      this.productList = this.productList;
      console.log(this.productList);
    }
  }

}
