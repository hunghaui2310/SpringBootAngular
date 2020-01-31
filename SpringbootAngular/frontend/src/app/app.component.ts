import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar, VERSION} from '@angular/material';
import {TestDialogComponent} from './test-dialog/test-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Đồ gỗ Huy Hùng';

  version = VERSION;
  currentUser;
  role;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private toastr: ToastrService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }

  testToast() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUserAfterLogin', this.currentUser);
    if (this.currentUser) {
      if (this.currentUser['role'] == 'ADMIN') {
        this.role = 'ADMIN';
      } else {
        this.role = 'USER';
      }
    } else {
      this.role = 'USER';
    }
  }
}
