import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../model/product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentModel} from '../../../model/comment.model';
import {CommentService} from '../../../service/comment.service';
import {config} from '../../../app-config/application.config';

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
  formQuickView: FormGroup;
  listComment: CommentModel[];
  currentUser;
  cartNum = 1;
  currentP = 1;
  pageSize = 2;

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private fb: FormBuilder,
              private commentService: CommentService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getProDetail(this.data.id);
    console.log('id', this.data.id);
    this.getListComment();
  }

  pageChange(page: number) {
    this.currentP = page;
  }

  form() {
    this.formQuickView = this.fb.group({
      id: [this.data.id],
      productname: [this.data.proName],
      urlImage: [this.data.url],
      proPrice: [this.data.proPrice],
      proDiscount: [this.data.proDiscount],
      proDes: [this.data.proDes],
      cateName: [this.data.cateName],
      numL: [this.data.numL]
    });
  }

  getProDetail(proId: number) {
    this.productId = new Product(proId);
    console.log(this.productId);
    this.productService.getProById(this.productId).subscribe(
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

  cartNumber(increase: boolean) {
    if (!increase) {
      this.cartNum = this.cartNum + 1;
      console.log('cartNum', this.cartNum);
    } else {
      this.cartNum = this.cartNum - 1;
    }
    if (this.cartNum <= 1) {
      this.cartNum = 1;
    }
  }

  closeForm(): void {
    this.dialogRef.close(true);
  }

  getListComment() {
    const modelComment = new Product(this.data.id);
    console.log('modelComment', modelComment);
    this.productService.showComment(modelComment).subscribe(
      data => {
        this.listComment = data['data'];
        console.log('commentList', this.listComment);
      }
    );
  }
}
