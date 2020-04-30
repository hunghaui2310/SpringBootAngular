import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/category';
import {SearchRequest} from '../../../model/search.request';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {CartService} from '../../../service/cart.service';
import {Observable} from 'rxjs';
import {config} from '../../../app-config/application.config';
import {WishList} from '../../../model/wish-list';
import {WishListService} from '../../../service/wish-list.service';
import {OtherService} from '../../../service/other.service';
import {AccountService} from '../../../service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: Category[];
  categoryId;
  productName;
  searchRequest: SearchRequest;
  products;
  cartNum;
  userId;
  dataCart;
  productInCart: Product[];
  subtotal;
  currentUser: User;
  wishListDTO;
  wishList;
  listPro: Product[];
  clickNumCart: boolean;
  userInfo: User;
  userEmail: string;

  constructor(private http: HttpClient,
              private router: Router,
              private accountService: AccountService,
              private productService: ProductService,
              private cartService: CartService,
              private wishListService: WishListService,
              private categoryService: OtherService) {
    this.fetchOrderCode();
    if (this.clickNumCart === true) {
      this.cartNum = this.cartNum + 1;
    }
    if (localStorage.getItem('currentUser')) {
      this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showInfoUser();
    this.getComboboxCate();
    this.categoryId = null;
    this.getNumCart();
    console.log('currentUser', this.currentUser.username);
    this.showAllWishList();
  }

  getComboboxCate() {
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.categories = data['data'];
      },
      error => (console.log('NO DATA!'))
    );
  }

  proCate(categoryId: number) {
    this.router.navigate(['/product-category/' + categoryId]);
  }

  search() {
    this.searchRequest = new SearchRequest(null, this.productName, this.categoryId, null);
    this.productService.search(this.searchRequest).subscribe(
      dataSearch => {
        this.products = dataSearch['data'];
        this.productService.setService(this.products);
      },
      error => {
      },
      () => {
        console.log('ok');
      }
    );
  }

  getNumCart() {
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      numCart => {
        this.dataCart = numCart['data'];
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    window.location.replace('/logout');
  }

  showAllWishList() {
    this.wishListDTO = new WishList(null, null, this.currentUser.id);
    this.wishListService.showAllWishListAPI(this.wishListDTO).subscribe(
      dataShow => {
        this.wishList = dataShow['data'];
        this.listPro = this.wishList['productDTOList'];
      }
    );
  }

  showInfoUser() {
    const userModel = new User(this.currentUser.id);
    this.accountService.getDataUser(userModel).subscribe(
      data => {
        this.userInfo = data['data'];
      }
    );
  }

  fetchOrderCode() {
    this.wishListService.numCartFetch$.subscribe(
      dataFetch => {
        this.clickNumCart = dataFetch;
      });
  }
}
