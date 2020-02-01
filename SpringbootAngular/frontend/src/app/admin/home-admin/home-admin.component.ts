import { Component, OnInit } from '@angular/core';
import {ProductAdminService} from '../../../service/admin/product-admin.service';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {config} from '../../../app-config/application.config';
import {CategoryAdminService} from '../../../service/admin/category-admin.service';
import {Category} from '../../../model/category';
import {SearchRequest} from '../../../model/search.request';
import {BlogAdminService} from '../../../service/admin/blog-admin.service';
import {Blog} from '../../../model/blog';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  listProduct: Product[];
  listCategory: Category[];
  listBlog: Blog[];
  currentUser: User;
  currentP = 1;
  pageSize = 10;
  searchProduct;
  productName;

  constructor(private productAdmin: ProductAdminService,
              private categoryService: CategoryAdminService,
              private blogAdminService: BlogAdminService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategory();
    this.getAllBlog();
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

  searchProductAdmin() {
    this.searchProduct = new SearchRequest(null, this.productName);
    console.log('searchProductAdmin', this.searchProduct);
    this.productAdmin.searchAdminAPI(this.searchProduct).subscribe(
      dataSearchPro => {
        this.listProduct = dataSearchPro['data'];
        console.log('dataAfterSearch', this.listProduct);
      }
    );
  }

  getAllBlog() {
    this.blogAdminService.getAllBlogAdmin().subscribe(
      dataBlog => {
        this.listBlog = dataBlog['data'];
      }
    );
  }
}
