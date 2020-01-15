import {Component, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchRequest} from '../../../model/search.request';
import {ProductService} from '../../service/product.service';
import {CartService} from '../../service/cart.service';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output searchProduct

  categories: Category[];
  categoryId;
  productName;
  searchRequest: SearchRequest;
  products;
  cartNum;
  userId;
  dataCart;
  productInCart: Product[] = [];
  subtotal;
  currentUser: User;
  li1;
  li2;
  router1;
  router2;

  constructor(private http: HttpClient,
              private router: Router,
              private productService: ProductService,
              private cartService: CartService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getComboboxCate();
    this.categoryId = null;
    this.getNumCart();
    this.directional();
  }

  getCategoryAPI(): Observable<Category[]> {
    return this.http.get<Category[]>(config.category_API);
  }

  getComboboxCate() {
    this.getCategoryAPI().subscribe(
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
    this.userId = this.currentUser.id;
    console.log('userId', this.userId);
    this.cartService.getNumCartAPI(this.userId).subscribe(
      numCart => {
        this.dataCart = numCart['data'];
        console.log('dataCart', this.dataCart);
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/logout']);
  }

  directional() {
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
      this.li1 = this.currentUser.username;
      this.router1 = '/profile';
      this.li2 = 'Đăng xuất';
      this.router2 = '/logout';
    } else {
      this.li1 = 'Đăng nhập';
      this.router1 = '/login';
      this.li2 = 'Đăng kí';
      this.router2 = '/register';
    }
  }
}
