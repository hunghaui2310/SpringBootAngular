import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../model/model.user';
import {HttpClient} from '@angular/common/http';
import {config} from '../app-config/application.config';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  userData$: Observable<any> = this.userData.asObservable();

  numberConfirm: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  numberConfirm$: Observable<any> = this.numberConfirm.asObservable();

  constructor(private router: Router,
              private http: HttpClient) { }

  setUserData(userData: any) {
    this.userData.next(userData);
  }

  setNumberConfirm(numberConfirm: any) {
    this.numberConfirm.next(numberConfirm);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  confirmMailAPI(user: User) {
    return this.http.post(config.confirm_mail_API, user);
  }
}
