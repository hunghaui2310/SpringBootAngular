import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Product} from '../../../model/product';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../service/cart.service';
import {User} from '../../../model/model.user';
import {Cart} from '../../../model/cart';
import {Blog} from '../../../model/blog';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.scss'],
  providers: [BsModalService]
})
export class ShowCartComponent implements OnInit {

  dataCart;
  cartNum;
  productInCart: Product[];
  subtotal;
  currentUser;
  cartRequest;
  notification;
  codeDiscount;
  codeRequest;
  dataCode: any;
  discount;
  mobjModalRef: BsModalRef;
  productId;

  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private modalService: BsModalService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.showProInCart();
  }

  closeForm(): void {
    this.mobjModalRef.hide();
  }

  showProInCart() {
    //   this.userId = this.route.snapshot.params['userId'];
    this.currentUser = new User(this.currentUser.id, null, null, null, null, null);
    console.log('dataReceive', this.currentUser);
    this.cartService.getNumCartAPI(this.currentUser).subscribe(
      dataCarts => {
        this.dataCart = dataCarts['data'];
        this.cartNum = this.dataCart['numCart'];
        this.productInCart = this.dataCart['productDTOList'];
        console.log('proInCart', this.productInCart);
        this.subtotal = this.dataCart['subtotal'];
      }
    );
  }

  removeProInCart() {
    this.cartRequest = new Cart(this.currentUser.id, this.productId);
    console.log('removeProInCart', this.cartRequest);
    this.cartService.removeProCartAPI(this.cartRequest).subscribe(
      removes => {
        this.notification = removes['data'];
        if (this.notification === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
          this.showProInCart();
        } else {
          this.notificationError('Xóa thất bại');
        }
        this.mobjModalRef.hide();
        this.showProInCart();
        console.log('notification', this.notification);
      },
      error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationWarning(notification: string) {
    this.toastr.error(notification, 'Thông báo',{
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Thông báo');
  }

  updateNumCart(productId: number) {

  }

  deleteCartConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const proId = data['id'];
    this.productId = proId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  getCodeDiscount(code: string) {
    this.codeRequest = new Blog(null, null, code, null, null, null);
    console.log('this.codeRequest', this.codeRequest);
    this.cartService.codeDiscountAPI(this.codeRequest).subscribe(
      dataCode => {
        this.dataCode = dataCode['data'];
        console.log('dataCode', this.dataCode);
        if (this.dataCode === 'EMPTY') {
          this.notificationWarning('Chưa nhập mã khuyến mại!');
          this.dataCode = null;
        } else if (this.dataCode === 'CODE_NOT_EXIST') {
          this.notificationWarning('Mã khuyến mại không tồn tại');
          this.dataCode = null;
        } else {
          this.discount = this.dataCode;
          console.log('dataCode', this.discount);
          this.cartService.setOrderCode(this.discount);
        }
      }, error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  updateFaKe() {
    this.notificationSuccess('Cập nhật giỏ hàng thành công');
  }
}
