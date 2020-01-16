import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {

  dataCart;
  cartNum;
  productInCart: Product[];
  subtotal;
  currentUser;

  constructor(private cartService: CartService,
              private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showProInCart();
  }

  showProInCart() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null);
    console.log('userIdssss', this.currentUser.id);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      dataCarts => {
        this.dataCart = dataCarts['data'];
        console.log('proInCartfdasdas', dataCarts);
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        console.log('proInCart', this.productInCart);
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }
}
