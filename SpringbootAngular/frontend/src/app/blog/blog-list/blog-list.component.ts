import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../../../app-config/application.config';
import {Blog} from '../../../model/blog';
import {Router} from '@angular/router';
import {OtherService} from '../../service/other.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private blogService: OtherService) { }

  blogList: Blog[];
  currentP = 1;

  ngOnInit() {
    this.getBlogList();
  }

  getBlogList() {
    this.blogService.getBlogAPI().subscribe(
      dataBlog => {
        this.blogList = dataBlog['data'];
      }
    );
  }

  blogDetail(id: number) {
    this.router.navigate(['/detail-blog/' + id]);
  }

  pageBlog(page: number) {
    let total = this.currentP * 4;
    console.log('total', total);
    if (this.currentP * 4 > this.blogList.length) {
      total = this.blogList.length;
    }
    this.currentP = page;
    console.log('page', this.currentP);
  }
}
