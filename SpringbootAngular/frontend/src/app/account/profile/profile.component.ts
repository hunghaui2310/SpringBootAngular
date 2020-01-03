import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/model.user';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

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
  }
}
