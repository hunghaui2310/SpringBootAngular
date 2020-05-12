import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../service/account.service';
import {ApiService} from '../../../service/api.service';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  hide: false;
  user: User = new User();
  errorMessage: string;
  loading: boolean;

  constructor(public accountService: AccountService,
              public router: Router,
              private apiService: ApiService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  register() {
    const name = this.fullName.value;
    const emailRegister = this.email.value;
    const passwordRegister = this.password.value;
    if (name && emailRegister && passwordRegister) {
      this.user.username = emailRegister;
      this.user.password = passwordRegister;
      this.accountService.createAccount(this.user).subscribe(data => {
          this.notificationSuccess('Đăng kí thành công');
          this.router.navigate(['/login']);
        }, err => {
          console.log(err);
          this.errorMessage = 'Tên đăng kí đã tồn tại';
          this.notificationError(this.errorMessage);
        }
      );
    } else {
      this.notificationError('Bạn cần điền đầy đủ thông tin');
    }
    // this.apiService.setUserData(this.user);
    // console.log('user register:', this.user);
    // this.apiService.confirmMailAPI(this.user).subscribe(
    //   data => {
    //     if (data['code'] === 200) {
    //       if (data['data'] === 'DUPLICATE') {
    //         this.notificationError('Tài khoản đã tồn tại');
    //       } else {
    //         this.loading = true;
    //         this.apiService.setNumberConfirm(data['data']);
    //         this.router.navigate(['/confirm']);
    //       }
    //     } else {
    //       this.notificationError('Email không tồn tại');
    //     }
    //   }
    // );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  notificationError(notifi: string) {
    this.toastr.error(notifi, 'Thông báo');
  }
}
