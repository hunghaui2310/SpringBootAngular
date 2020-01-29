import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    console.log('hbfjfhasdhfsad');
    this.authService.authenticate(this.user, (e) => {
      window.location.replace('/home');
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
}
