import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from '../../../model/product';
import {WriteReviewComponent} from '../write-review/write-review.component';
import {Cart} from '../../../model/cart';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {CartService} from '../../../service/cart.service';
import {ModelComment} from '../../../model/model.comment';
import {CommentModel} from '../../../model/comment.model';
import {CommentService} from '../../../service/comment.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {WishList} from '../../../model/wish-list';
import {WishListService} from '../../../service/wish-list.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  currentUser;
  productId;
  productName;
  price;
  realPrice;
  dataProduct;
  numLike;
  description;
  cateName;
  discount;
  categoryId;
  sameProList: Product[];
  numSamePro;
  listImg;
  listImgSmall;
  conditionCart;
  notificationMessage;
  writeReview;
  condition;
  commentList: ModelComment[];
  contentReview;
  private mobjModalRef: BsModalRef;
  commentContent;
  commentId;
  idCommentDelete;
  wishListDTO;
  wishListInsert;
  cartNum = 1;
  clickNumCart: boolean;

  title = 'angularowlslider';
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private cartService: CartService,
              private commentService: CommentService,
              private wishListService: WishListService,
              private modalService: BsModalService,
              private dialogRef: MatDialog,
              config: NgbCarouselConfig) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.getProDetail();
    // tslint:disable-next-line:no-unused-expression
    this.categoryId;
    this.showComment();
  }

  getProDetail() {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.productService.productDetailAPI(this.productId).subscribe(
      data => {
        console.log('data detail', data['data']);
        this.dataProduct = data['data'];
        this.listImg = this.dataProduct['urlImage'];
        this.listImgSmall = this.dataProduct['imageSmall'];
        this.productName = this.dataProduct['productName'];
        this.price = this.dataProduct['price'];
        this.numLike = this.dataProduct['numLike'];
        this.description = this.dataProduct['description'];
        this.cateName = this.dataProduct['categoryName'];
        this.realPrice = this.dataProduct['realPrice'];
        this.discount = this.dataProduct['discount'];
        this.categoryId = this.dataProduct['categoryId'];
        console.log('cateId', this.categoryId);
        this.getSamePro(this.dataProduct['categoryId']);
      });
  }

  getSamePro(cateId: number) {
    // console.log('cateId', this.categoryId);
    this.productService.sameProAPI(cateId).subscribe(
      dataSame => {
        console.log(dataSame['data']);
        this.sameProList = dataSame['data']['productDTOList'];
        this.numSamePro = dataSame['data']['numLimit'];
        console.log('sameProList', this.sameProList);
        console.log('numSamePro', this.numSamePro);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(WriteReviewComponent, {
      width: '750px',
      data: {
        data: this.writeReview,
        productId: this.productId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.writeReview = result;
    });
  }

  addProCart(productId: number) {
    this.conditionCart = new Cart(this.currentUser.id, productId);
    console.log('this.currentUser.id', this.currentUser.id);
    console.log('productIdToAddCart', productId);
    this.cartService.addCartAPI(this.conditionCart).subscribe(
      message => {
        if (message['code'] === 200) {
          this.notificationMessage = message['data'];
          console.log('this.notificationMessage', this.notificationMessage);
          this.notificationSuccess('Thêm vào giỏ thành công');
          this.clickNumCart = true;
          this.wishListService.setNumCart(this.clickNumCart);
        } else {
          this.notificationError('Bạn phải đăng nhập để sử dụng chức năng này');
        }
      },
      error => this.notificationError('Lỗi')
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification);
  }

  notificationError(message: string) {
    this.toastr.error(message);
  }

  showComment() {
    this.condition = new Product(this.productId);
    console.log('productId', this.condition);
    this.productService.showComment(this.condition).subscribe(
      dataComment => {
        this.commentList = dataComment['data'];
        console.log('listComment', this.commentList);
      }
    );
  }

  saveComment() {
    const modelComment = new CommentModel(null, this.currentUser.id, this.productId, null, this.contentReview);
    console.log('dataComment', modelComment);
    this.commentService.saveCommentProAPI(modelComment).subscribe(
      data => {
        if (data['data'] === 'SUCCESS') {
          this.notificationSuccess('Gửi thành công');
        } else {
          this.notificationError('Lỗi');
        }
        this.onBack();
      }
    );
  }

  clickSave(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  clickDelete(pobjTemplate: TemplateRef<any>, id: number) {
    this.idCommentDelete = id;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  onBack() {
    this.mobjModalRef.hide();
  }

  getCommentById(id: number) {
    const commentModel = new CommentModel(id);
    console.log('commentById', commentModel);
    this.commentService.getCommentByIdAPI(commentModel).subscribe(
      data => {
        this.commentContent = data['data']['content'];
        this.commentId = data['data']['id'];
        console.log('dataContent', this.commentContent);
      }
    );
  }

  editComment() {
    const modelEdit = new CommentModel(this.commentId, this.currentUser.id, this.productId, null, this.contentReview);
    console.log('commentEditModel', modelEdit);
    this.commentService.editCommentAPI(modelEdit).subscribe(
      data => {
        if (data['data'] === 'SUCCESS') {
          this.notificationSuccess('Sửa thành công');
        } else {
          this.notificationError('Lỗi');
        }
        this.showComment();
        this.onBack();
      }
    );
  }

  deleteComment() {
    const modelDelete = new CommentModel(this.idCommentDelete);
    console.log('deleteComment', modelDelete);
    this.commentService.deleteComment(modelDelete).subscribe(
      data => {
        if (data['data'] === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
        } else {
          this.notificationError('Lỗi');
        }
        this.onBack();
        this.showComment();
      }
    );
  }

  insertToWishList(productId: number) {
    this.wishListDTO = new WishList(null, productId, this.currentUser.id);
    console.log('wishListCondition', this.wishListDTO);
    this.wishListService.insertWishListAPI(this.wishListDTO).subscribe(
      dataWishList => {
        this.wishListInsert = dataWishList['data'];
        console.log('wishListNotification', this.wishListInsert);
        if (this.wishListInsert === 'SUCCESS') {
          this.notificationSuccess('Thêm vào yêu thích thành công');
        } else {
          this.notificationError('Sản phẩm đã tồn tại trong yêu thích');
        }
      }, error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  changeNumCart(change: boolean) {
    if (change) {
        this.cartNum = this.cartNum + 1;
    } else {
      this.cartNum = this.cartNum - 1;
    }
    if (this.cartNum <= 1) {
      this.cartNum = 1;
    }
  }
}
