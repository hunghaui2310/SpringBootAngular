import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../model/product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  cartNum: number;
  currentP = 1;
  pageSize = 2;
  productArr = new Array();
  product = new Product();

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private fb: FormBuilder,
              private commentService: CommentService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    dialogRef.disableClose = true;
    this.formQuickView = new FormGroup({
      id: new FormControl(),
      productName: new FormControl(),
      urlImage: new FormControl(),
      proPrice: new FormControl(),
      proDiscount: new FormControl(),
      proDes: new FormControl(),
      cateName: new FormControl(),
      numL: new FormControl()
    });
  }

  ngOnInit() {
    this.getProDetail(this.data.id);
    this.getListComment();
    this.cartNum = 1;
  }

  pageChange(page: number) {
    this.currentP = page;
  }

  form() {
    this.formQuickView = this.fb.group({
      id: [this.data.id, Validators.required],
      productName: [this.data.proName],
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
      });
  }

  cartNumber(increase: boolean) {
    if (!increase) {
      this.cartNum = this.cartNum + 1;
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

  buyNow() {
    if (this.productName && this.price) {
      this.product.productName = this.productName;
      this.product.price = this.price;
      this.product.numProInCart = this.cartNum;
      this.productArr.push(this.product);
      if (sessionStorage.getItem('product')) {
        sessionStorage.removeItem('product');
      }
      sessionStorage.setItem('product', JSON.stringify(this.productArr));
      this.closeForm();
    }
  }
}
