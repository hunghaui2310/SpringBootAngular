import { Component, OnInit } from '@angular/core';
import {Blog} from '../../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';
import {OtherService} from '../../../service/other.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogList: Blog[] = [];
  blogId;
  title = 'fff';
  contentDetail;
  header;
  footer;
  createDate;
  numSee;
  img;
  dataDetail;
  imgBanner;

  constructor(private blogService: OtherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getDataDetailBlog();
    this.getBlogList();
  }

  getDataDetailBlog() {
    this.blogId = this.route.snapshot.params['id'];
    console.log('blogId', this.blogId);
    this.blogService.blogDetailAPI(this.blogId).subscribe(
      dataDetailBlog => {
        console.log(dataDetailBlog['data']);
        this.dataDetail = dataDetailBlog['data'];
        this.blogId = this.dataDetail['id'];
        this.contentDetail = this.dataDetail['contentDetail'];
        this.title = this.dataDetail['title'];
        this.createDate = this.dataDetail['createDate'];
        this.numSee = this.dataDetail['numSee'];
        this.img = this.dataDetail['img'];
        this.header = this.dataDetail['header'];
        this.footer = this.dataDetail['footer'];
        this.imgBanner = this.dataDetail['imgBanner'];
      }
    );
  }

  getBlogList() {
    this.blogService.getBlogAPI().subscribe(
      dataBlog => {
        this.blogList = dataBlog['data'];
        console.log('data-list-blog', this.blogList);
      }
    );
  }

  blogDetail(id: number) {
    this.router.navigate(['/detail-blog/' + id]);
  }
}
