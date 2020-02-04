import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {

  constructor(private http: HttpClient) { }

  getAllCateAdminAPI(): Observable<Category> {
    // @ts-ignore
    return this.http.get(config.get_all_category_admin_API);
  }

  getCategoryAPI(): Observable<Category[]> {
    return this.http.get<Category[]>(config.category_API);
  }

  createCategoryAdminAPI(category: Category) {
    return this.http.post(config.create_category_admin_API, category);
  }
}
