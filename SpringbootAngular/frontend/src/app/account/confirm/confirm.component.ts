import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {User} from '../../../model/model.user';
import {AccountService} from '../../../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  numberInput: number;
  numberConfirm: number;
  userData: User = new User();

  constructor(private apiService: ApiService,
              public router: Router,
              private toastr: ToastrService,
              public accountService: AccountService) { }

  ngOnInit() {
    this.fetchOrderCode();
    this.fetchUserData();
  }

  fetchOrderCode() {
    this.apiService.numberConfirm$.subscribe(
      dataFetch => {
        console.log('dataFetchNumber', dataFetch);
        this.numberConfirm = dataFetch;
      });
  }

  fetchUserData() {
    this.apiService.userData$.subscribe(
      dataFetch => {
        console.log('dataFetchUser', dataFetch);
        this.userData = dataFetch;
      });
  }

  register() {
    if (this.numberInput === this.numberConfirm) {
      this.accountService.createAccount(this.userData).subscribe(
        data => {
          this.notificationSuccess('Đăng kí thành công');
          this.router.navigate(['/login']);
          }
        );
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }
}
