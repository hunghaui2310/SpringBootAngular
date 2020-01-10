import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>) {
    dialogRef.disableClose = true;
  }

  closeForm() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('view');
  }

}
