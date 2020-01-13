import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {sort, Sort} from '../../../model/sort';
import {Product} from '../../../model/product';
import {Router} from '@angular/router';
import {QuickViewComponent} from '../quick-view/quick-view.component';
import {SearchRequest} from '../../../model/search.request';
import {config} from '../../../app-config/application.config';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-pro-cate',
  templateUrl: './pro-cate.component.html',
  styleUrls: ['./pro-cate.component.css']
})
export class ProCateComponent implements OnInit {

  products1;
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
  categoryId;
  pageSize = config.pageSize;
  sortList: Sort[] = sort;

  constructor(private productService: ProductService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.cateProData(this.categoryId);
  }

  cateProData(categoryId: any) {
    this.productService.productCateAPI(this.categoryId).subscribe(
      dataProCate => {
        this.products1 = dataProCate['data'];
      }
    );
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

  pageChange(page: number) {
    let total = this.currentP * config.pageSize;
    if (this.currentP * config.pageSize > this.products1.length) {
      total = this.products1.length;
    }

    this.currentP = page;
    console.log('page', this.currentP);
  }
}
