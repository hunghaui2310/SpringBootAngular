import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../../model/blog';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  blogDetailAPI(blogId: number) {
    return this.http.get(config.blog_detail_API + '/' + blogId);
  }

  getBlogAPI() {
    return this.http.get(config.blog_API);
  }

  getDataInAbout() {
    return this.http.get(config.about_API);
  }
}
