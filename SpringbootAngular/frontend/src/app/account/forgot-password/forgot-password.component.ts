import { Component, OnInit } from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../../service/account.service";
import {User} from "../../../model/model.user";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);
  passwordAgainFormControl = new FormControl('', Validators.required);
  user: User;
  hidden: boolean;

  constructor(private toastr: ToastrService,
              private accountServicve: AccountService) { }

  ngOnInit() {
    this.hidden = false;
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  checkPassword() {
    if (this.passwordAgainFormControl.value !== this.passwordFormControl.value) {
      this.showError('Mật khẩu không trùng khớp');
    }
  }

  forgotPassword() {
    if (this.passwordAgainFormControl.value !== this.passwordFormControl.value) {
      this.checkPassword();
    } else {
      this.hidden = true;
      const user = new User(null, this.emailFormControl.value);
      this.accountServicve.forgotPassword(user).subscribe(
        res => {
          if (res['code'] === 200) {
            if (res['data'] === 'SUCCESS') {
              this.showSuccess('Hãy xác thực trong email của bạn');
            } else {
              this.showError('Tài khoản không tồn tại');
            }
          } else {
            this.showError('Email không chính xác');
          }
          this.hidden = false;
        }
      );
    }
  }
}
