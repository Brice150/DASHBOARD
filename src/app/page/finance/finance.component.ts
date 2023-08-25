import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StrategyDialogComponent } from 'src/app/shared/components/dialogs/strategy-dialog/strategy-dialog.component';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  
  openStrategyDialog() {
    this.dialog.open(StrategyDialogComponent);
  }
}
