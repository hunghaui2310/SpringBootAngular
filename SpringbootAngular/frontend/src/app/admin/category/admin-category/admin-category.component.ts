import {Component, OnInit, TemplateRef} from '@angular/core';
import {CategoryAdminService} from '../../../../service/admin/category-admin.service';
import {Category} from '../../../../model/category';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
  providers: [BsModalService]
})
export class AdminCategoryComponent implements OnInit {

  listCategory: Category[];
  categoryId: number;
  mobjModalRef: BsModalRef;
  cateNew;
  categoryName: string;
  formCreateCate: FormGroup;
  dataNotification;
  currentP = 1;
  pageSize = 10;

  constructor(private categoryService: CategoryAdminService,
              private modalService: BsModalService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  closeForm(): void {
    this.mobjModalRef.hide();
  }

  pageChange(page: number) {
    this.currentP = page;
    console.log('page', this.currentP);
  }

  getAllCategory() {
    this.categoryService.getAllCateAdminAPI().subscribe(
      dataCate => {
        this.listCategory = dataCate['data'];
        console.log('man hinh category da hoat dong', this.listCategory);
      }
    );
  }

  createCategoryConfirm(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  deleteCategoryConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const cateId = data.id;
    this.categoryId = cateId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  addCategory() {
    const model = new Category(null, this.formCreateCate.controls['categoryName'].value);
    console.log('nameCateToCreate', model);
    this.categoryService.createCategoryAdminAPI(model).subscribe(
      dataCreateCate => {
        this.dataNotification = dataCreateCate['data'];
        console.log('notificationCreateCate', this.dataNotification);
        if (this.dataNotification === 'SUCCESS') {
          this.notificationSuccess('Thêm mới thể loại thành công');
        } else {
          this.notificationError('Thêm mới thất bại');
        }
        this.mobjModalRef.hide();
        this.getAllCategory();
      }, error => this.notificationError('Đã xảy ra lôi!')
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError(notification: string) {
    this.toastr.error(notification, 'Thông báo');
  }
}
