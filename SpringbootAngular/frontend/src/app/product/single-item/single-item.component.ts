import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/Product';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css'],
  providers: [NgbCarouselConfig]
})
export class SingleItemComponent implements OnInit {

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  productId;
  productName;
  price;
  realPrice;
  dataProduct;
  numLike;
  description;
  cateName;
  discount;
  categoryId;
  sameProList: Product[];
  numSamePro;

  ngOnInit() {
    this.getProDetail();
    // tslint:disable-next-line:no-unused-expression
    this.categoryId;
  }

  getProDetail() {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.productService.productDetailAPI(this.productId).subscribe(
      data => {
    console.log('data detail', data['data']);
    this.dataProduct = data['data'];
    this.productName = this.dataProduct['productName'];
    this.price = this.dataProduct['price'];
    this.numLike = this.dataProduct['numLike'];
    this.description = this.dataProduct['description'];
    this.cateName = this.dataProduct['categoryName'];
    this.realPrice = this.dataProduct['realPrice'];
    this.discount = this.dataProduct['discount'];
    this.categoryId = this.dataProduct['categoryId'];
    console.log('cateId', this.categoryId);
    this.getSamePro(this.dataProduct['categoryId']);
    });
  }

  getSamePro(ss: number) {
    // console.log('cateId', this.categoryId);
    this.productService.sameProAPI(ss).subscribe(
        dataSame => {
          console.log(dataSame['data']);
          this.sameProList = dataSame['data']['productDTOList'];
          this.numSamePro = dataSame['data']['numLimit'];
          console.log('sameProList', this.sameProList);
          console.log('numSamePro', this.numSamePro);
        }
      );
  }
}
