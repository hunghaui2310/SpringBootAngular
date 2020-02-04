import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductAdminService} from '../../../../service/admin/product-admin.service';
import {Product} from '../../../../model/product';
import {SearchRequest} from '../../../../model/search.request';
import {DeleteProduct} from '../../../../model/delete.product';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CreateProductComponent} from '../create-product/create-product.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  providers: [BsModalService]
})
export class AdminProductComponent implements OnInit {

  listProduct: Product[];
  currentP = 1;
  pageSize = 10;
  searchProduct;
  proId: DeleteProduct;
  productId: number;
  message;
  mobjModalRef: BsModalRef;
  productName;
  mobjNewProduct: Product = new Product();

  constructor(private productAdmin: ProductAdminService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllProduct();
    this.searchProductAdmin();
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

  createProduct() {
    this.mobjNewProduct = new Product();
    this.mobjNewProduct.id = -1;
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '1000px',
      height: '550px',
      data: {
        obj: this.mobjNewProduct
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentP = 1;
      this.getAllProduct();
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

  deleteProductAdmin() {
    this.proId = new DeleteProduct(this.productId);
    console.log('productIdToDelete', this.proId);
    this.productAdmin.deleteProductAPI(this.proId).subscribe(
      dataDelete => {
        this.message = dataDelete['data'];
        console.log('resultDeleteProduct', this.message);
        if (this.message === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
        } else {
          this.notificationError('Xóa thất bại');
        }
        this.mobjModalRef.hide();
        this.getAllProduct();
      }, error => this.notificationError('Đã xảy ra lỗi')
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Thông báo');
  }
}
