import { Component, OnInit } from '@angular/core';
import {OtherService} from '../../../service/other.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  totalIsNew;
  totalProduct;
  totalNumBuy;
  totalNumLike;
  datas;

  constructor(private aboutService: OtherService) { }

  ngOnInit() {
    this.getDataAbout();
  }

  getDataAbout() {
    // @ts-ignore
    this.aboutService.getDataInAbout().subscribe(
      dataAbout => {
        this.datas = dataAbout['data'];
        console.log('dataAbout', this.datas);
        this.totalIsNew = this.datas['totalIsNew'];
        this.totalNumBuy = this.datas['totalNumBuy'];
        this.totalProduct = this.datas['totalProduct'];
        this.totalNumLike = this.datas['totalNumLike'];
      }
    );
  }

}
