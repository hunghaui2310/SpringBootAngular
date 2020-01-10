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
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    // const productId: Product = new Product(this.productId);
    this.productService.productDetailAPI(this.productId).subscribe(
      data => {
        // this.productList = [];
        console.log('data detail', data);
        // this.productService.setService(data);
      }
    );
  }


}
