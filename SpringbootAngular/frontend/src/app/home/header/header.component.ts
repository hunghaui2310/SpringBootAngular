import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';
import { Router } from '@angular/router';
import {SearchRequest} from '../../../model/search.request';
import {HomeService} from '../../service/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories;
  categoryId;
  productName;
  searchRequest: SearchRequest;
  products;

  constructor(private http: HttpClient,
              private router: Router,
              private homeService: HomeService) { }

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

  proCate(categoryId: number) {
    this.router.navigate(['/product-category/' + categoryId]);
  }

  search() {
    this.searchRequest = new SearchRequest(null, this.productName, this.categoryId, null);
    console.log('search', this.searchRequest);
    this.homeService.search(this.searchRequest).subscribe(
      dataSearch => {
        console.log(dataSearch['data']);
        this.products = dataSearch['data'];
      },
        error => {
        (console.log('LOI SEARCH!', error));
        },
      () => {
        console.log('ok');
      }
    );
  }
}
