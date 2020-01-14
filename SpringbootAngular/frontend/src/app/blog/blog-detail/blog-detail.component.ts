import { Component, OnInit } from '@angular/core';
import {OtherService} from '../../service/other.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogId;
  title;
  contentDetail;
  header;
  footer;
  createDate;
  numSee;
  img;
  dataDetail;

  constructor(private blogService: OtherService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getDataDetailBlog() {
    this.blogId = this.route.snapshot.params['id'];
    console.log('blogId', this.blogId);
    this.blogService.blogDetailAPI(this.blogId).subscribe(
      dataDetailBlog => {
          this.dataDetail = dataDetailBlog['data'];
          this.blogId = this.dataDetail['id'];
          this.contentDetail = this.dataDetail['contentDetail'];
          this.title = this.dataDetail['title'];
          this.createDate = this.dataDetail['createDate'];
          this.numSee = this.dataDetail['numSee'];
          this.img = this.dataDetail['img'];
          this.header = this.dataDetail['header'];
          this.footer = this.dataDetail['footer'];
      }
    );
  }
}
