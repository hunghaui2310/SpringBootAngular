import { Component } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static API_URL = 'http://localhost:8083';
  title = 'Đồ gỗ Huy Hùng';
}
