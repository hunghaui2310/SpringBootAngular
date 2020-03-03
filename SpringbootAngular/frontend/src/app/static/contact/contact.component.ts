import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;
  isPreSpace: boolean;
  private modalRef: BsModalRef;

  validation_messages = {
    'customerName': [
      {type: 'required', message: 'Bạn chưa nhập họ và tên'}
    ],
    'customerEmail': [
      {type: 'required', message: 'Bạn chưa nhập Email'}
    ]
  };

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: BsModalService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.formContact = this.fb.group( {
      customerName: ['', {validators: [Validators.required]}],
      customerEmail: ['', {validators: [Validators.required]}],
      contactSubject: [''],
      contactMessage: ['']
    });
  }

  openConfirm(pobjTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  checkSpace(event) {
    if ((event.target.value || '').trim().length === 0) {
      this.isPreSpace = true;
    } else {
      this.isPreSpace = false;
    }
  }

  notiSuccess(message: string) {
    this.toastr.success(message);
  }

  submit() {
    this.notiSuccess('Gửi thành công');
    this.onBack();
  }

  onBack() {
    this.modalRef.hide();
  }
}
