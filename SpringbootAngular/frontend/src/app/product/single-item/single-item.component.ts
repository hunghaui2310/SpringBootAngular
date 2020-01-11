import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/Product';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  productId;
  productName;
  price;
  realPrice;
  dataProduct;
  numLike;
  description;
  cateName;


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
    });
  }

  ngOnInit() {
    this.getProDetail();
  }


}
