import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../service/account.service';
import {add} from 'ngx-bootstrap/chronos';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  formUser: FormGroup;
  modalRef: BsModalRef;
  isPreSpace: boolean;
  // tslint:disable-next-line:variable-name
  validation_messages = {
    'email': [
      {type: 'required', message: 'Bạn chưa nhập email'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    'password': [
      {type: 'required', message: 'Bạn chưa nhập mật khẩu'}
    ],
    'phoneNumber': [
      {type: 'pattern', message: 'Số điện thoại không đúng định dạng'}
    ]
  };

  constructor(public router: Router,
              private toast: ToastrService,
              private modalService: BsModalService,
              private account: AccountService,
              private fb: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
  }

  ngOnInit() {
  }

  updateUser() {
    const firstName = this.formUser.controls.firstName.value === '' ? null :
      this.formUser.controls.firstName.value;
    const lastName = this.formUser.controls.lastName.value === '' ? null :
      this.formUser.controls.lastName.value;
    const email = this.formUser.controls.email.value;
    const password = this.formUser.controls.password.value;
    const address = this.formUser.controls.address.value === '' ? null :
      this.formUser.controls.address.value;
    const phoneNumber = this.formUser.controls.phoneNumber.value === '' ? null :
      this.formUser.controls.phoneNumber.value;
    const modelUser = new User(this.currentUser.id, null, password, null, address, phoneNumber, email, firstName, lastName);
    console.log('user to update', modelUser);
    this.account.updateUser(modelUser).subscribe(
      data => {
        console.log('update User: ', data['data']);
        if (data['code'] === 200) {
          if (data['data'] === 'SUCCESS') {
            this.notiSuccess('Cập nhật thành công');
          } else {
            this.notiError('Tài khoản này đã tồn tại');
          }
        } else {
          this.notiError('Đã xảy ra lỗi');
        }
      }
    );
  }

  checkSpace(event) {
    if ((event.target.value || '').trim().length === 0) {
      this.isPreSpace = true;
    } else {
      this.isPreSpace = false;
    }
  }

  openConfirm(pobjTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  createForm() {
    this.formUser = this.fb.group({
      firstName: [this.currentUser.firstName],
      lastName: [this.currentUser.lastName],
      email: [this.currentUser.email, {validators: [Validators.required, Validators.email]}],
      password: [this.currentUser.password, {validators: [Validators.required]}],
      phoneNumber: [this.currentUser.phoneNumber, {validators: [Validators.pattern('^[0-9; ]{8,}$')]}],
      address: [this.currentUser.address]
    });
  }

  notiSuccess(message: string) {
    this.toast.success(message);
  }

  notiError(message: string) {
    this.toast.error(message);
  }

  onBack() {
    this.modalRef.hide();
  }

  resetForm() {
    this.formUser = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      address: ['']
    });
  }
}
