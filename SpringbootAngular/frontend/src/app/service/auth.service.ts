import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {User} from '../../model/model.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;
  constructor(public http: HttpClient) { }
  public errorMessage = '';
  authenticated = false;
  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(AppComponent.API_URL + '/account/login', {headers})
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

  public logIn(user: User) {
    console.log(user);
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    // creating base64 encoded String from user name and password
    const base64Credential: string = btoa( user.username + ':' + user.password);
    headers.set( 'Authorization', 'Basic ' + base64Credential);
    console.log(headers);
    // const options = new RequestOptions();

    return this.http.get(AppComponent.API_URL + '/account/login', {headers});
  }

  logout() {

  }
}
