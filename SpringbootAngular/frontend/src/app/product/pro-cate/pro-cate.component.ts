import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {sort, Sort} from '../../../model/sort';
import {Product} from '../../../model/product';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  nameCate;
  productDTOList: Product[];

  ngOnInit() {
    this.getDataPro();
  }

  getDataPro() {
    const cateId = this.route.snapshot.params['id'];
    this.productService.productCateAPI(cateId).subscribe(
      data => {
        this.productDTOList = data['data'];
      }
    );
  }
}
