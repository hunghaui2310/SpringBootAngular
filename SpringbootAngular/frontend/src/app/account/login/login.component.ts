import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../service/auth.service';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  hide: false;
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {

  }

  login() {
    this.user.username = this.email.value;
    this.user.password = this.password.value;
    this.authService.loginAPI(this.user).subscribe((e) => {
      console.log(e);
      if (e['code'] == 401) {
        if (e['errors'] === 'NOT_EXIST') {
          this.toastr.error('Tài khoản không tồn tại');
        } else {
          this.toastr.error('Sai mật khẩu');
        }
      } else {
        this.toastr.success('Đăng nhập thành công');
        let resp: any;
        resp = e['data'];
        if (resp) {
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp));
        }
        setTimeout(function sto() {
          window.location.replace('/home');
        }, 1000);
        // this.user.fullName = 'ndh';
      }
    });
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }
}
