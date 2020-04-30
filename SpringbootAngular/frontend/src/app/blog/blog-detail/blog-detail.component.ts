import {Component, OnInit, TemplateRef} from '@angular/core';
import {Blog} from '../../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';
import {OtherService} from '../../../service/other.service';
import {CommentModel} from '../../../model/comment.model';
import {CommentService} from '../../../service/comment.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../../model/category';

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
  listComment: CommentModel[];
  currentUser;
  commentContent: string;
  btnSend = false;
  private mobjModalRef: BsModalRef;
  commentId;
  categories: Category[];

  constructor(private blogService: OtherService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private categoryService: OtherService,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getDataDetailBlog();
    this.getBlogList();
    this.getListComment();
    if (this.commentContent.trim() === '') {
      this.commentContent = null;
    }
    this.getCategory();
  }

  getDataDetailBlog() {
    this.blogId = this.route.snapshot.params['id'];
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
        this.imgBanner = this.dataDetail['imgBanner'];
      }
    );
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

  getListComment() {
    const modelComment = new CommentModel(null, this.currentUser.id, null, this.blogId);
    this.commentService.getCommentByBlog(modelComment).subscribe(
      data => {
        this.listComment = data['data'];
      }
    );
  }

  clickSave(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  clickDelete(pobjTemplate: TemplateRef<any>, id: number) {
    this.commentId = id;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  getByBlogId(id: number) {
    this.btnSend = true;
    const modelComment = new CommentModel(id);
    this.commentService.getCommentByIdAPI(modelComment).subscribe(
      data => {
        this.commentContent = data['data']['content'];
        this.commentId = data['data']['id'];
      }
    );
  }

  onBack() {
    this.mobjModalRef.hide();
  }

  saveComment(type: number) {
    if (type === 0) { // them moi comment
      const modelComment = new CommentModel(null, this.currentUser.id, null, this.blogId, this.commentContent);
      this.commentService.saveCommentProAPI(modelComment).subscribe(
        data => {
          if (data['data'] === 'SUCCESS') {
            this.notificationSuccess('Thêm bình luận thành công');
          } else {
            this.notificationError();
          }
          this.onBack();
          this.getListComment();
          this.commentContent = null;
        }
      );
    } else {
      const modelComment = new CommentModel(this.commentId, this.currentUser.id, null, this.blogId, this.commentContent);
      this.commentService.editCommentAPI(modelComment).subscribe(
        data => {
          if (data['data'] === 'SUCCESS') {
            this.notificationSuccess('Sửa bình luận thành công');
          } else {
            this.notificationError();
          }
          this.onBack();
          this.getListComment();
          this.commentContent = null;
        }
      );
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError() {
    this.toastr.error('Lỗi', 'Thông báo');
  }

  deleteComment() {
    const modelComment = new CommentModel(this.commentId);
    this.commentService.deleteComment(modelComment).subscribe(
      data => {
        if (data['data'] === 'SUCCESS') {
          this.notificationSuccess('Xóa thành công');
        } else {
          this.notificationError();
        }
        this.onBack();
        this.getListComment();
      }
    );
  }

  getCategory() {
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.categories = data['data'];
      }
    );
  }
}
