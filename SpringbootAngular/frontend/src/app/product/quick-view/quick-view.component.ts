import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

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

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private productService: ProductService,
              private route: ActivatedRoute) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getProDetail();
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

  closeForm(): void {
    this.dialogRef.close();
  }
}
