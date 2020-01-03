import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  mobjModalRef: BsModalRef;
  constructor() { }

  closeModal() {
    this.mobjModalRef.hide();
  }

  ngOnInit() {
  }

}
