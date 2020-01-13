import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/Product';
import {QuickViewComponent} from '../quick-view/quick-view.component';
import {SearchRequest} from '../../../model/search.request';
import {MatDialog} from '@angular/material';
import {config} from '../../../app-config/application.config';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {sort, Sort} from '../../../model/sort';
import {Observable} from 'rxjs';
import {Category} from '../../../model/category';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, AfterViewInit {
   @Input() productList: Product[];

  currentP = 1;
  urlImage;
  dataTables: Product[] = [];
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
  products;

  constructor(private productService: ProductService,
              private router: Router,
              private http: HttpClient,
              public dialog: MatDialog) {
  }

 // productList: any = [];

  ngOnInit() {
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
    const productId: Product = new Product(id);
    this.router.navigate(['/detail/' + id]);

  }

  showData(row: any) {
    this.productName = row['productName'];
    this.urlImage = row['urlImage'];
    this.productPrice = row['price'];
    this.productDiscount = row['realPrice'];
    this.productDescription = row['description'];
    this.categoryName = row['categoryName'];
    this.numLike = row['numLike'];

    const vdialog = this.dialog.open(QuickViewComponent, {
      maxWidth: '85vw',
      maxHeight: '100vh',
      width: '75vw',
      data: {
        proName: this.productName,
        url: this.urlImage,
        proPrice: this.productPrice,
        proDiscount: this.productDiscount,
        proDes: this.productDescription,
        cateName: this.categoryName,
        numL: this.numLike
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

  proCatess(categoryId: number) {
    this.router.navigate(['/product-category/' + categoryId]);
  }

  searchss() {
    this.searchRequest = new SearchRequest(null, this.productName, this.categoryId, null);
    console.log('search', this.searchRequest);
    this.productService.search(this.searchRequest).subscribe(
      dataSearch => {
        console.log(dataSearch['data']);
        this.productList = dataSearch['data'];
      },
      error => {
        (console.log('LOI SEARCH!', error));
      },
      () => {
        console.log('ok');
      }
    );
  }

}
