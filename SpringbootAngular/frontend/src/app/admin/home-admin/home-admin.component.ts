import { Component, OnInit } from '@angular/core';
import {ProductAdminService} from '../../../service/admin/product-admin.service';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  listProduct: Product[];

  constructor(private productAdmin: ProductAdminService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productAdmin.getAllProAdminAPI().subscribe(
      dataListPro => {
        this.listProduct = dataListPro['data'];
        console.log('dataProductInAdmin', this.listProduct);
      }
    );
  }
}
