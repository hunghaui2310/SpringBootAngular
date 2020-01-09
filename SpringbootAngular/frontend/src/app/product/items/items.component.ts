import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/Product';
import { NgxPaginationModule } from 'ngx-pagination';
import {QuickViewComponent} from '../quick-view/quick-view.component';
import {SearchRequest} from '../../../model/search.request';
import {HomeService} from '../../service/home.service';
import {MatDialog} from '@angular/material';

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

  constructor(private homeService: HomeService,
              public dialog: MatDialog) { }

  pageChange(page: number) {
    let total = this.currentP * 12;
    if (this.currentP * 15 > this.productList.length) {
      total = this.productList.length;
    }

    this.currentP = page;
    console.log('page', this.currentP);
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
      result => {this.loadData();
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

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!this.productList) {
    } else {
      this.productList = this.productList;
      console.log(this.productList);
    }
  }

}
