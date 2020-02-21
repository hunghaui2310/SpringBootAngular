import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app-config/application.config';
import {CommentModel} from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  saveCommentProAPI(comment: CommentModel) {
    return this.http.post(config.saveCommentProduct_API, comment);
  }

  editCommentAPI(comment: CommentModel) {
    return this.http.post(config.editComment_API, comment);
  }

  getCommentByIdAPI(comment: CommentModel) {
    return this.http.post(config.getCommentById_API, comment);
  }

  getCommentByBlog(comment: CommentModel) {
    return this.http.post(config.getCommentByBlog_API, comment);
  }

  deleteComment(comment: CommentModel) {
    return this.http.post(config.deleteComment_API, comment);
  }
}
