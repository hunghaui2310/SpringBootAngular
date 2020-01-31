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
  // li1;
  // li2;
  // router1;
  // router2;

  constructor(private http: HttpClient,
              private router: Router,
              private productService: ProductService,
              private cartService: CartService,
              private wishListService: WishListService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getComboboxCate();
    this.categoryId = null;
    this.getNumCart();
    console.log('currentUser', this.currentUser.username);
    this.showAllWishList();
  }

  getCategoryAPI(): Observable<Category[]> {
    return this.http.get<Category[]>(config.category_API);
  }

  getComboboxCate() {
    this.getCategoryAPI().subscribe(
      data => {
        console.log('dataCategory', data);
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
    console.log('search', this.searchRequest);
    this.productService.search(this.searchRequest).subscribe(
      dataSearch => {
        console.log(dataSearch['data']);
        this.products = dataSearch['data'];
        this.productService.setService(this.products);
      },
      error => {
        (console.log('LOI SEARCH!', error));
      },
      () => {
        console.log('ok');
      }
    );
  }

  getNumCart() {
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    console.log('userId', this.currentUser.id);
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
    this.router.navigate(['/logout']);
    console.log('currentUser', localStorage.removeItem('currentUser'));
  }

  showAllWishList() {
    this.wishListDTO = new WishList(null, null, this.currentUser.id);
    console.log('conditionWishList', this.wishListDTO);
    this.wishListService.showAllWishListAPI(this.wishListDTO).subscribe(
      dataShow => {
        this.wishList = dataShow['data'];
        console.log('dataWishList', this.wishList);
        this.listPro = this.wishList['productDTOList'];
        console.log(this.wishList['productDTOList']);
      }
    );
  }

  // directional() {
  //   if (JSON.parse(localStorage.getItem('currentUser')) != null) {
  //     this.li1 = this.currentUser.username;
  //     this.router1 = '/profile';
  //     this.li2 = 'Đăng xuất';
  //     this.router2 = '/logout';
  //   } else {
  //     this.li1 = 'Đăng nhập';
  //     this.router1 = '/login';
  //     this.li2 = 'Đăng kí';
  //     this.router2 = '/register';
  //   }
  // }
}
