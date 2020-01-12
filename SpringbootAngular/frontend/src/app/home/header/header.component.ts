import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getComboboxCate();
  }

  getCategoryAPI(): Observable<Category[]> {
    return this.http.get<Category[]>(config.category_API);
  }

  getComboboxCate() {
    this.getCategoryAPI().subscribe(
      data => {
      this.categories = data['data'];
      },
      error => (console.log('NO DATA!'))
    );
  }
}
