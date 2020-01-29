import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  logOut() {
    // this.authService.logOut();
    // localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/logout']);
    console.log('currentUser', localStorage.removeItem('currentUser'));
  }
}
