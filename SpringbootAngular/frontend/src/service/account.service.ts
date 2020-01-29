import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/model.user';
import {config} from '../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) { }

  createAccount(user: User) {
    return this.http.post(config.routeAPI + '/account/register', user);
  }

  getDataUser(user: User) {
    return this.http.post(config.data_user_API, user);
  }
}
