import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BlogAdminService} from '../../../../service/admin/blog-admin.service';
import {Blog} from '../../../../model/blog';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
  providers: [BsModalService]
})
export class AdminBlogComponent implements OnInit {

  mobjModalRef: BsModalRef;
  listBlog: Blog[];
  blogId: number;
  currentP = 1;
  pageSize = 3;

  constructor(private blogAdminService: BlogAdminService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllBlog();
  }

  closeForm(): void {
    this.mobjModalRef.hide();
  }

  getAllBlog() {
    this.blogAdminService.getAllBlogAdmin().subscribe(
      dataBlog => {
        this.listBlog = dataBlog['data'];
      }
    );
  }

  pageChange(page: number) {
    this.currentP = page;
    console.log('page', this.currentP);
  }

  deleteBlogConfirm(data: any, pobjTemplate: TemplateRef<any>) {
    const blgId = data['id'];
    this.blogId = blgId;
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }
}
