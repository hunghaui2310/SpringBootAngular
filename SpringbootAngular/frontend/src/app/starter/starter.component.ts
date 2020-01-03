import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../service/home.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  constructor(public router: Router,
              private showNumCart: HomeService) {}
  numCart;

  ngOnInit() {
  }

  logOut() {
    // this.authService.logOut();
    // localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/logout']);
  }

  showNumberCart(userId: 2) {
    this.showNumCart.showNumberCartAPI(userId).subscribe(
      (showNum) => {
        this.numCart = showNum['data'];
        console.log('userId', userId);
      },
      error => (console.error('Không có dữ liệu'))
    );
  }
}
