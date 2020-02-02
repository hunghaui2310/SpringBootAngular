import { Component, OnInit } from '@angular/core';
import {CommentAdminService} from '../../../service/admin/comment-admin.service';
import {ModelComment} from '../../../model/model.comment';
import {User} from '../../../model/model.user';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  listNotification: ModelComment[];
  currentUser: User;

  constructor(private commentService: CommentAdminService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getSomeNotification();
  }

  getSomeNotification() {
    this.commentService.getSomeNotiAdminAPI().subscribe(
      dataNotification => {
        this.listNotification = dataNotification['data'];
        console.log('notificationAdmin', this.listNotification);
      }
    );
  }
}
