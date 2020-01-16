import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private productService: ProductService,
              private route: ActivatedRoute) {
    dialogRef.disableClose = true;
  }

  productId;
  dataProduct;
  productName;
  price;
  numLike;
  description;
  cateName;
  realPrice;
  discount;
  categoryId;

  ngOnInit() {
    console.log('view');
    this.getProDetail();
  }

  closeForm() {
    this.dialogRef.close();
  }

  getProDetail() {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.productService.productDetailAPI(this.productId).subscribe(
      data => {
        console.log('data detail', data['data']);
        this.dataProduct = data['data'];
        this.productName = this.dataProduct['productName'];
        this.price = this.dataProduct['price'];
        this.numLike = this.dataProduct['numLike'];
        this.description = this.dataProduct['description'];
        this.cateName = this.dataProduct['categoryName'];
        this.realPrice = this.dataProduct['realPrice'];
        this.discount = this.dataProduct['discount'];
        this.categoryId = this.dataProduct['categoryId'];
        console.log('cateId', this.categoryId);
      });
  }
}
