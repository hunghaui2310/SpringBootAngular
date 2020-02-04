import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryAdminService} from '../../../../service/admin/category-admin.service';
import {Category} from '../../../../model/category';
import {Product} from '../../../../model/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../../app-config/application.config';
import {ProductAdminService} from '../../../../service/admin/product-admin.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form;
  categories: Category[];
  mobjNewProduct: Product = new Product();
  productName;
  discount;
  codeDiscount;
  price;
  description;
  categoryId;
  mobjFileList: FileList;
  url: any;
  addTitle = 'Thêm mới sản phẩm';
  updateTitle = 'Sửa sản phẩm';
  value;
  mobjModalRef: BsModalRef;

  constructor(private dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private categoryService: CategoryAdminService,
              private toastr: ToastrService,
              private productAdminService: ProductAdminService) { }

  ngOnInit() {
    this.getComboboxCate();
    this.categoryId = null;
  }

  closeForm(): void {
    this.mobjModalRef.hide();
  }

  getComboboxCate() {
    this.categoryService.getCategoryAPI().subscribe(
      data => {
        console.log('dataCategory', data);
        this.categories = data['data'];
      },
      error => (console.log('NO DATA!'))
    );
  }

  selectBigFile(pobjEvent) {
    if (pobjEvent.target.files && pobjEvent.target.files.length > 0) {
      this.mobjFileList = pobjEvent.target.files;
      const vfileFile: File = this.mobjFileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.mobjFileList[0]);
      reader.onload = event => {
        this.url = reader.result;
      };
      this.mobjNewProduct.urlImage = vfileFile.name;
    }
  }

  smallFileSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.mobjFileList = event.target.files;
      const vfileFile: File = this.mobjFileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.mobjFileList[0]);
      reader.onload = eventSmall => {
        this.url = reader.result;
      };
      this.mobjNewProduct.urlImage = vfileFile.name;
    }
  }

  upload(type: string, id: number, list: any) {
    if (this.mobjFileList && this.mobjFileList.length > 0) {
      const vfileFile: File = this.mobjFileList[0];
      const actionid = '17';
      const vobjFormData: FormData = new FormData();
      vobjFormData.append('file', vfileFile);
      vobjFormData.append('actionId', actionid);
      const vobjHeaders = new HttpHeaders();
      vobjHeaders.append('Content-type', 'multipart/form-data');
      vobjHeaders.append('Accept', 'application/json');
      const options = { header: vobjHeaders };
      // @ts-ignore
      this.http.post(`${config.routeAPI}/admin-product/upload/${type}/${id}`, vobjFormData, options).subscribe(
        (respon: any) => {
          if (respon.code === 200) {
            list[0].urlImage = respon.data;
            console.log('imgLogList', list);
            this.productAdminService.saveProduct(list).subscribe(
              res => {
                if (res.code === 200) {
                  if (this.mobjNewProduct.id !== -1) {
                    this.dialogRef.close();
                  } else {
                    this.mobjFileList = null;
                    this.mobjNewProduct = this.data.obj;
                    this.url = null;
                  }
                  if (type === '00') {
                    this.notificationSuccess('Thêm mới thành công');
                  } else {
                    this.notificationError('Cập nhật thành công');
                  }
                  this.dialogRef.close();
                } else {
                  this.notificationError('Xảy ra lỗi');
                }
              }
            );
          } else {
            this.notificationError('Đã xảy ra lỗi');
          }
          this.mobjModalRef.hide();
        }
      );
    } else {
      this.productAdminService.saveProduct(list).subscribe(
        res => {
          if (res.code === 200) {
            if (this.mobjNewProduct.id !== -1) {
              this.dialogRef.close();
            } else {
              this.mobjFileList = null;
              this.mobjNewProduct = this.data.obj;
              this.url = null;
            }
            if (type === '00') {
              this.notificationSuccess('Thêm mới thành công');
            } else {
              this.notificationSuccess('Cập nhật thành công');
            }
            this.dialogRef.close();
          } else {
            this.notificationError(res.errors);
          }
          this.closeForm();
        }
      );
    }
  }

  save() {
    const list: Product[] = [];
    list.push(this.mobjNewProduct);
    if (this.mobjNewProduct.id !== -1) {
      this.upload('01', this.mobjNewProduct.id, list);
    } else {
      this.upload('00', this.mobjNewProduct.id, list);
      this.mobjFileList = null;
      this.mobjNewProduct = this.data.obj;
      this.url = null;
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Thông báo');
  }
}
