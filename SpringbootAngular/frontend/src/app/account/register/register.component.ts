import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(public accountService: AccountService,
              public router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
        this.notificationSuccess('Đăng kí thành công');
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.errorMessage = 'Tên đăng kí đã tồn tại';
        this.notificationError(this.errorMessage);
      }
    );
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
