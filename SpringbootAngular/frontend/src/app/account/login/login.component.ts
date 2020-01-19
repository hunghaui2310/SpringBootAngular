import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
    this.authService.authenticate(this.user, (e) => {
      this.notificationSuccess('Đăng nhập thành công')
      this.router.navigateByUrl('/home');
      console.log(e);
      let resp: any;
      resp = e.principal;
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
