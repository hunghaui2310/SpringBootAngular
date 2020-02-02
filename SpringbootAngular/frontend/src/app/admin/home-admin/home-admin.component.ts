import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductAdminService} from '../../../service/admin/product-admin.service';
import {Product} from '../../../model/product';
import {User} from '../../../model/model.user';
import {config} from '../../../app-config/application.config';
import {CategoryAdminService} from '../../../service/admin/category-admin.service';
import {Category} from '../../../model/category';
import {SearchRequest} from '../../../model/search.request';
import {BlogAdminService} from '../../../service/admin/blog-admin.service';
import {Blog} from '../../../model/blog';
import {OrderService} from '../../../service/order.service';
import {Order} from '../../../model/order';
import {MatDialog} from '@angular/material';
import {CreateProductComponent} from '../create-product/create-product.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  providers: [BsModalService]
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
  conditionOrder;
  orderId;
  userNameNotification;
  createDateNotification;
  cityNotification;
  dataNotification;
  del: number;
  mobjModalRef: BsModalRef;
  productId;
  message;

  constructor(private productAdmin: ProductAdminService,
              private categoryService: CategoryAdminService,
              private blogAdminService: BlogAdminService,
              private dialog: MatDialog,
              private orderService: OrderService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategory();
    this.getAllBlog();
    this.fetchOrderId();
    this.showNotificationOrder();
  }

  closeForm(): void {
    this.mobjModalRef.hide();
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

  fetchOrderId() {
    this.orderService.orderId$.subscribe(
      dataFetch => {
        this.orderId = dataFetch;
        console.log('idOrderFetch', this.orderId);
      }
    );
  }

  showNotificationOrder() {
    this.conditionOrder = new Order(this.orderId);
    console.log('conditionConfirm', this.conditionOrder);
    this.orderService.confirmOrderAPI(this.conditionOrder).subscribe(
      dataConfirm => {
        this.dataNotification = dataConfirm['data'];
        console.log('dataNotification', this.dataNotification);
        this.userNameNotification = this.dataNotification['fullName'];
        this.cityNotification = this.dataNotification['city'];
        this.createDateNotification = this.dataNotification['createDate'];
      }
    );
  }

  createProduct() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '1000px',
      height: '550px',
      data: {name: this.productName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.productName = result;
    });
  }

  deleteProductAdmin() {
    const proId = this.route.snapshot.params['id'];
    console.log('productIdToDelete', proId);
    this.productAdmin.deleteProductAPI(proId).subscribe(
      dataDelete => {
        this.message = dataDelete['data'];
        console.log('resultDeleteProduct', this.message);
        if (this.message === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
        } else {
          this.notificationError('Xóa thất bại');
        }
      }, error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  deleteProductConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const proId = data['id'];
    this.del = proId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  deleteCategoryConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const cateId = data['id'];
    this.del = cateId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  deleteBlogConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const blogId = data['id'];
    this.del = blogId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Thông báo');
  }
}
