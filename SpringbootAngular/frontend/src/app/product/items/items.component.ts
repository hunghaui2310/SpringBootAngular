import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../model/product';
import {config} from '../../../app-config/application.config';
import {sort, Sort} from '../../../model/sort';
import {SearchRequest} from '../../../model/search.request';
import {User} from '../../../model/model.user';
import {ProductService} from '../../../service/product.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../service/cart.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {OtherService} from '../../../service/other.service';
import {QuickViewComponent} from '../quick-view/quick-view.component';
import {Observable} from 'rxjs';
import {Category} from '../../../model/category';
import {Cart} from '../../../model/cart';
import {WishList} from '../../../model/wish-list';
import {WishListService} from '../../../service/wish-list.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  @Input() productList: Product[];

  currentP = 1;
  urlImage;
  dataTables: Product[];
  productId;
  productName;
  productPrice;
  productDiscount;
  productDescription;
  categoryName;
  numLike;
  pageSize = config.pageSize;
  sortList: Sort[] = sort;
  sortCondition;
  searchRequest: SearchRequest;
  categories;
  categoryId;
  currentUser: User;
  conditionAddCart;
  notificationMessage;
  comPareRequest;
  wishListDTO;
  wishListInsert;
  cartNum: number;
  productBuyNow = new Product();

  constructor(private productService: ProductService,
              private router: Router,
              private http: HttpClient,
              public dialog: MatDialog,
              private cartService: CartService,
              private toastr: ToastrService,
              private compareService: OtherService,
              private wishListService: WishListService,
              configCarousel: NgbCarouselConfig) {
    {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      configCarousel.interval = 4000;
      configCarousel.wrap = true;
      configCarousel.keyboard = false;
      configCarousel.pauseOnHover = true;
    }
  }

  ngOnInit() {
    if (localStorage.getItem('dataCart')) {
      this.cartNum = JSON.parse(localStorage.getItem('dataCart'))['numCart'];
    } else {
      this.cartNum = 0;
    }
    this.getProducts();
    this.sortCondition = null;

    this.getComboboxCate();
    this.categoryId = null;

    this.productService.service$.subscribe(
      data => {
        console.log(data);
        this.productList = data;
      }
    );
  }

  proCate(categoryId: number) {
    this.router.navigate(['/product-category/' + categoryId]);
  }

  search() {
    this.searchRequest = new SearchRequest(null, null, null, this.sortCondition);
    console.log('search', this.searchRequest);
    this.productService.search(this.searchRequest).subscribe(
      dataSerach => {
        console.log(dataSerach['data']);
        this.productList = dataSerach['data'];
      },
      error => {
        (console.log('LOI SEARCH', error));
      },
      () => {
        console.log('ok');
      }
    );
  }

  getProducts() {
    this.productService.productAPI().subscribe(
      dataProducts => {
        this.productList = dataProducts['data'];
        console.log(dataProducts);
      },
      error => (console.error('NO DATA'))
    );
  }

  pageChange(page: number) {
    let total = this.currentP * config.pageSize;
    if (this.currentP * config.pageSize > this.productList.length) {
      total = this.productList.length;
    }

    this.currentP = page;
    console.log('page', this.currentP);
  }

  productDetail(id: number) {
    this.router.navigate(['/detail/' + id]);
  }

  showData(row: Product) {

    const vdialog = this.dialog.open(QuickViewComponent, {
      maxWidth: '85vw',
      maxHeight: '100vh',
      width: '75vw',
      data: {
        id: row.id,
        proName: row.productName,
        url: row.urlImage,
        proPrice: row.price,
        proDiscount: row.discount,
        proDes: row.description,
        cateName: row.categoryName,
        numL: row.numLike
      }
    });

    vdialog.afterClosed().subscribe(
      result => {
        this.loadData();
        console.log('load Data', this.loadData());
      });
  }

  loadData() {
    const searchModel: SearchRequest = new SearchRequest(this.productId);
    console.log('search', searchModel);
    this.productService.search(searchModel).subscribe(
      data => {
        console.log('data search', data['data']);
        this.dataTables = data['data'];
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.productList) {
    } else {
      this.productList = this.productList;
      console.log(this.productList);
    }
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

  addProToCart(productId: number) {
    if (localStorage.getItem('currentUser')) {
      this.conditionAddCart = new Cart(this.currentUser.id, productId);
      this.cartService.addCartAPI(this.conditionAddCart).subscribe(
        message => {
          // this.cartNum = this.cartNum + 1;
          this.cartService.nextNumCart(true);
          this.notificationMessage = message['data'];
          if (this.notificationMessage === 'CREATE' || this.notificationMessage === 'UPDATE') {
            this.notificationSuccess('Thêm vào giỏ thành công');
          } else {
            this.notificationError('Lỗi');
          }
        },
        error => this.notificationError('Đã xảy ra lỗi')
      );
    } else {
      this.notificationError('Bạn phải đăng nhập để sử dụng chức năng này');
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationError(messageError: string) {
    this.toastr.error(messageError, 'Thông báo');
  }

  addProToCompare(productId: number) {
    this.comPareRequest = new Cart(this.currentUser.id, productId);
    console.log('compareRequest', this.comPareRequest);
    this.compareService.addCompareAPI(this.comPareRequest).subscribe(
      dataCompare => {
        this.notificationMessage = dataCompare['data'];
        if (this.notificationMessage === 'SUCCESS') {
          this.notificationSuccess('Thêm so sánh thành công');
        } else {
          this.notificationError('Sản phẩm này đã tồn tại trong so sánh');
        }
      },
      error => this.notificationError('Đã xả ra lỗi')
    );
  }

  insertToWishList(productId: number) {
    if (localStorage.getItem('currentUser')) {
      this.wishListDTO = new WishList(null, productId, this.currentUser.id);
      console.log('wishListCondition', this.wishListDTO);
      this.wishListService.insertWishListAPI(this.wishListDTO).subscribe(
        dataWishList => {
          this.wishListInsert = dataWishList['data'];
          console.log('wishListNotification', this.wishListInsert);
          if (this.wishListInsert === 'SUCCESS') {
            this.notificationSuccess('Thêm vào yêu thích thành công');
          } else {
            this.notificationError('Sản phẩm đã tồn tại trong yêu thích');
          }
        }, error => this.notificationError('Đã xảy ra lỗi')
      );
    } else {
      this.notificationError('Bạn phải đăng nhập để sử dụng chức năng này');
    }
  }

  buyNow(productId: number) {
    const id = new Product(productId);
    this.productService.buyNow(id).subscribe(
      data => {
        if (data['code'] === 200) {
          const productArr = new Array();
          this.productBuyNow.productName = data['data']['productName'];
          this.productBuyNow.realPrice = data['data']['realPrice'];
          this.productBuyNow.numProInCart = 1;
          this.productBuyNow.total = data['data']['realPrice'];
          productArr.push(this.productBuyNow);
          sessionStorage.setItem('productBuyNow', JSON.stringify(productArr));
          window.location.replace('/checkout');
        } else {
          this.toastr.error('Đã xảy ra lỗi. Vui lòng thủ lại sau');
        }
      });
  }
}
