import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';
import {Blog} from '../../../model/blog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) { }

  blogList: Blog[] = [];
  blogId;

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

  blogDetail(id: number) {
    this.router.navigate(['/detail-blog/' + id]);
  }
}
