import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../service/product.service';
import {Product} from '../../../model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  getProduct() {
   this.productService.productAPI().subscribe(
     dataProducts => {
      this.products = dataProducts['data'];
      console.log(dataProducts);
     },
      error => (console.error('NO DATA'))
   );
  }

  ngOnInit() {
    this.getProduct();
  }
}
