import { Component, OnInit } from '@angular/core';
import {ProductAdminService} from '../../../service/admin/product-admin.service';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {config} from '../../../app-config/application.config';
import {CategoryAdminService} from '../../../service/admin/category-admin.service';
import {Category} from '../../../model/category';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  listProduct: Product[];
  listCategory: Category[];
  currentUser: User;
  currentP = 1;
  pageSize = 10;

  constructor(private productAdmin: ProductAdminService,
              private categoryService: CategoryAdminService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategory();
  }

  getAllProduct() {
    this.productAdmin.getAllProAdminAPI().subscribe(
      dataListPro => {
        this.listProduct = dataListPro['data'];
        console.log('dataProductInAdmin', this.listProduct);
      }
    );
  }

  pageChange(page: number) {
    let total = this.currentP * this.pageSize;
    if (this.currentP * this.pageSize > this.listProduct.length) {
      total = this.listProduct.length;
    }

    this.currentP = page;
    console.log('page', this.currentP);
  }

  getAllCategory() {
    this.categoryService.getAllCateAdminAPI().subscribe(
      dataCate => {
        this.listCategory = dataCate['data'];
      }
    );
  }
}
