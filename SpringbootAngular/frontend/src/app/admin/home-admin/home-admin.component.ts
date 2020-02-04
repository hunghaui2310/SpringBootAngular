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
import {CreateProductComponent} from '../product/create-product/create-product.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DeleteProduct} from '../../../model/delete.product';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  providers: [BsModalService]
})
export class HomeAdminComponent implements OnInit {

  listCategory: Category[];
  listBlog: Blog[];
  currentUser: User;
  currentP = 1;
  pageSize = 10;
  productName;
  conditionOrder;
  orderId;
  userNameNotification;
  createDateNotification;
  cityNotification;
  dataNotification;
  mobjModalRef: BsModalRef;
  productId: number;
  categoryId: number;
  blogId: number;
  message;
  categoryName: string;
  cateNew;
  formCreateCate: FormGroup;

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
    this.getAllBlog();
    this.fetchOrderId();
    this.showNotificationOrder();
  }

  closeForm(): void {
    this.mobjModalRef.hide();
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

  deleteProductConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const proId = data['id'];
    this.productId = proId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  deleteCategoryConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const cateId = data['id'];
    this.categoryId = cateId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  createCategoryConfirm(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  deleteBlogConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const blgId = data['id'];
    this.blogId = blgId;
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

  addCategory() {
    this.cateNew = new Category(null, this.categoryName);
    Object.assign(this.cateNew, this.formCreateCate.value);
    console.log('nameCateToCreate', this.cateNew);
    this.categoryService.createCategoryAdminAPI(this.cateNew).subscribe(
      dataCreateCate => {
        this.dataNotification = dataCreateCate['data'];
        console.log('notificationCreateCate', this.dataNotification);
        if (this.dataNotification === 'SUCCESS') {
          this.notificationSuccess('Thêm mới thể loại thành công');
        } else {
          this.notificationError('Thêm mới thất bại');
        }
        this.mobjModalRef.hide();
      }, error => this.notificationError('Đã xảy ra lôi!')
    );
  }
}
