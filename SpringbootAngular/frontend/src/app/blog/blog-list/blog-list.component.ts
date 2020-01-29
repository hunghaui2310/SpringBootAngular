import { Component, OnInit } from '@angular/core';
import {OtherService} from '../../../service/other.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../../../model/blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blogList: Blog[];
  currentP = 1;

  constructor(private http: HttpClient,
              private router: Router,
              private blogService: OtherService) { }

  ngOnInit() {
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
