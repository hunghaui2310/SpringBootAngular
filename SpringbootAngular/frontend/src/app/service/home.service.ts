import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../app-routing/application.config';
import {SearchRequest} from '../../model/search.request';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  search(searchModel: SearchRequest) {
    return this.http.post(config.search_product, searchModel);
  }

  showNumberCartAPI(userId: 2) {
    return this.http.post(config.get_num_cart, userId);
  }
}
