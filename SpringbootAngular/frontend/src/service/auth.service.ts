import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router;
  public errorMessage = '';
  authenticated = false;

  constructor(public http: HttpClient) { }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(config.routeAPI + '/account/login', {headers})
      .subscribe((response) => {
        let data: any ;
        data = response;
        const u = data.principal;
        if (response['fullName']) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return callback && callback(data);
      });

  }
}
