import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentModel} from '../../../model/comment.model';
import {CommentService} from '../../../service/comment.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  review: string;
  reviewForm: FormGroup;
  currentUser;
  private mobjModalRef: BsModalRef;

  constructor(public dialogRef: MatDialogRef<WriteReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commentService: CommentService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.formReview();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onBack() {
    this.mobjModalRef.hide();
  }

  formReview() {
    this.reviewForm = this.formBuilder.group({
      reviewData: [this.data.data],
      productId: [this.data.productId]
    });
  }

  save() {
    let content;
    if (this.reviewForm.controls['review'].value === '') {
      content = null;
    } else {
      content = this.reviewForm.controls['review'].value;
    }
    const modelComment = new CommentModel(null, this.currentUser.id, this.data.productId, null, content);
    console.log('commentModelToSave', modelComment);
    this.commentService.saveCommentProAPI(modelComment).subscribe(
      data => {
        if (data['data'] === 'SUCCESS') {
          this.notificationSuccess('Gửi thành công');
        } else {
          this.notificationError();
        }
        this.onBack();
        this.onNoClick();
      }
    );
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, 'Thông báo');
  }

  notificationError() {
    this.toastr.error('Lỗi', 'Thông báo');
  }

  clickSave(pobjTemplate: TemplateRef<any>) {
    this.mobjModalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }
}
