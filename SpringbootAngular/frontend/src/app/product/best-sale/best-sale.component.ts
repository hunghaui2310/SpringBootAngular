import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/Product';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-best-sale',
  templateUrl: './best-sale.component.html',
  styleUrls: ['./best-sale.component.css']
})
export class BestSaleComponent implements OnInit, AfterViewInit{
  @Input() listProduct: Product[];

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }
  currentP = 1;

  pageChange(page: number) {
    let total = this.currentP * 12;
    if (this.currentP * 12 > this.listProduct.length) {
      total = this.listProduct.length;
    }
    this.currentP = page;
    console.log('page', this.currentP);
  }

  productDetail(id: number) {
    this.productService.proDetailAPI(id);
    location.replace('/best-sale');
    console.log('productId = ', id);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!this.listProduct) {
    } else {
      this.listProduct = this.listProduct;
      console.log(this.listProduct);
    }
  }
}
