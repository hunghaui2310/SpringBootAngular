import {AfterViewInit, Component, OnInit, TemplateRef} from '@angular/core';
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
import {CartData} from "../../../model/cart";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: Category[];
  categoryId = new FormControl();
  productName = new FormControl();
  searchRequest: SearchRequest;
  products;
  cartNum: number;
  userId;
  dataCart;
  productInCart: Product[];
  subtotal;
  currentUser: User;
  wishListDTO;
  wishList;
  listPro: Product[];
  setCartData = new CartData();
  updateNum: boolean;
  mobjModalRef: BsModalRef;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  userInfo: User;
  userEmail: string;

  constructor(private http: HttpClient,
              private router: Router,
              private accountService: AccountService,
              private productService: ProductService,
              private cartService: CartService,
              private wishListService: WishListService,
              private categoryService: OtherService,
              private modalService: BsModalService) {
    if (localStorage.getItem('currentUser')) {
      this.userEmail = JSON.parse(localStorage.getItem('currentUser')).username;
    }
    // this.cartNum = JSON.parse(localStorage.getItem('dataCart'))['numCart'];
  }

  ngOnInit() {
    console.log(this.options);
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.cartNum = 0;
      this.showInfoUser();
      this.getNumCart();
      this.showAllWishList();
      this.fetchCartNum();
      this.fetchCartNumFromSingleItem();
    } else {
      this.currentUser = null;
    }
    this.getComboboxCate();
    this.filteredOptions = this.productName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  closeForm(): void {
    this.mobjModalRef.hide();
  }

  getComboboxCate() {
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.categories = data['data'];
      }
    );
  }

  getAllProduct() {
    this.productService.getNameProduct().subscribe(
      (res) => {
           this.options = res['data'];
      }, error1 => {
        console.log('Loi: ', error1);
      }
    );
  }

  openLogout(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  proCate(categoryId: number) {
    this.router.navigate(['/product-category/' + categoryId]);
  }

  search() {
    this.searchRequest = new SearchRequest(null, this.productName.value, this.categoryId.value, null);
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

        this.setCartData.numCart = this.dataCart['numCart'];
        this.setCartData.price = this.dataCart['subtotal'];
        localStorage.setItem('dataCart', JSON.stringify(this.setCartData));
      }
    );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('dataCart');
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

  fetchCartNum() {
    this.cartService.numCart$.subscribe(
      dataFetch => {
        this.updateNum = dataFetch;
        if (this.updateNum) {
          this.cartNum = this.cartNum + 1;
        } else {
          this.cartNum = this.cartNum - 1;
        }
      });
  }

  fetchCartNumFromSingleItem() {
    this.wishListService.numCartFetch$.subscribe(
      dataFetch => {
        this.updateNum = dataFetch;
        if (this.updateNum) {
          this.cartNum = this.cartNum + 1;
        }
      });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.getAllProduct();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
