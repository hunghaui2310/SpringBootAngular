import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../../model/blog';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class BlogAdminService {

  constructor(private http: HttpClient) { }

  getAllBlogAdmin(): Observable<Blog[]> {
    // @ts-ignore
    return this.http.get(config.get_all_blog_admin_API);
  }
}
