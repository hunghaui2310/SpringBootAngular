import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../app-config/application.config';
import {ToastrService} from "ngx-toastr";
import {User} from "../model/model.user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router;
  public errorMessage = '';
  authenticated = false;

  constructor(public http: HttpClient,
              private toastr: ToastrService) { }

  // authenticate(credentials, callback) {
  //
  //   const headers = new HttpHeaders(credentials ? {
  //     authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
  //   } : {});
  //
  //   this.http.get(config.routeAPI + '/account/login', {headers})
  //     .subscribe((response) => {
  //       console.log(response);
  //       let data: any ;
  //       data = response['data'];
  //       const u = data.principal;
  //       if (response['fullName']) {
  //         this.authenticated = true;
  //       } else {
  //         this.authenticated = false;
  //       }
  //       return callback && callback(data);
  //     }, error1 => this.toastr.error('Đã xảy ra lỗi'));
  //
  // }

  loginAPI(user: User) {
    return this.http.post(config.login_API, user);
  }
}
