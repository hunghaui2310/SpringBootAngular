import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<QuickViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    dialogRef.disableClose = true;
  }

  closeForm() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('view');
  }

}
