import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';
import {Blog} from '../../../model/blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  blogList: Blog[] = [];

  ngOnInit() {
    this.getBlogList();
  }

  getBlogAPI() {
    return this.http.get(config.blog_API);
  }

  getBlogList() {
    this.getBlogAPI().subscribe(
      dataBlog => {
        this.blogList = dataBlog['data'];
      }
    );
  }
}
