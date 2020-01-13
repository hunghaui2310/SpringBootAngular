import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/Product';
import {QuickViewComponent} from '../quick-view/quick-view.component';
import {SearchRequest} from '../../../model/search.request';
import {HomeService} from '../../service/home.service';
import {MatDialog} from '@angular/material';
import {config} from '../../../app-config/application.config';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, AfterViewInit {
  // @Input() productList: Product[];

  currentP = 1;
  urlImage;
  dataTables: Product[] = [];
  productId;
  productName;
  productPrice;
  productDiscount;
  productDescription;
  categoryName;
  categoryId;
  numLike;
  pageSize = config.pageSize;

  constructor(private homeService: HomeService,
              private productService: ProductService,
              private router: Router,
              public dialog: MatDialog) {
  }

  productList: any = [];

  ngOnInit() {
    this.getProducts();
    this.cateProData(this.categoryId);
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
    // console.log('productId', id);

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
      });
  }

  loadData() {
    const searchModel: SearchRequest = new SearchRequest(this.productId);
    console.log('search', searchModel);
    this.homeService.search(searchModel).subscribe(
      data => {
        console.log('data search', data['data']);
        this.dataTables = data['data'];
      }
    );
  }

  cateProData(categoryId: any) {
    this.productService.productCateAPI(this.categoryId).subscribe(
      dataProCate => {
        this.productList = dataProCate['data'];
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

}
