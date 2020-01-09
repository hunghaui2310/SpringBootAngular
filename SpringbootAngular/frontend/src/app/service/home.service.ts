import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchRequest} from '../../model/search.request';
import {config} from '../../app-routing/application.config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  search(searchModel: SearchRequest) {
    return this.http.post(config.search_product, searchModel);
  }
}
