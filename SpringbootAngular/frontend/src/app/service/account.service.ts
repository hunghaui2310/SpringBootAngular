import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/model.user';
import {AppComponent} from '../app.component';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) { }

  createAccount(user: User) {
    return this.http.post(config.routeAPI + '/account/register', user);
  }
}
