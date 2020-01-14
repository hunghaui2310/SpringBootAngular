import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {

  userId;
  dataCart;
  cartNum;
  productInCart: Product[] = [];
  subtotal;

  constructor(private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.showProInCart();
  }

  showProInCart() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.userId = 2;
    console.log('userId', this.userId);
    this.cartService.getNumCartAPI(this.userId).subscribe(
      numCart => {
        this.dataCart = numCart['data'];
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }
}
