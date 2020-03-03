import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {

  }

  login() {
    console.log('fffffr');
    this.authService.authenticate(this.user, (e) => {
      this.notificationSuccess('Đăng nhập thành công');
      console.log('fffffre', e);
      let resp: any;
      resp = e.principal;
      console.log('fasfasfasf', resp);
      window.location.replace('/home');
      // this.user.fullName = 'ndh';
      if (resp) {
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(resp));
      }
    });
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }
}
