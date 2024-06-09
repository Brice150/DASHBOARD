import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { User } from '../../core/interfaces/user';
import { YearPipe } from '../../shared/pipes/year.pipe';
import { FinanceUpdateDialogComponent } from '../../shared/components/dialogs/update/finance/finance-update-dialog.component';
import { ActivePage } from '../../core/enums/active-page.enum';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, YearPipe],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  imagePath: string = environment.imagePath;
  @Input() user!: User;
  @Output() onFinanceTypeSelected: EventEmitter<ActivePage> =
    new EventEmitter<ActivePage>();
  ActivePage = ActivePage;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  openUpdateDialog(): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(FinanceUpdateDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success('Total amounts updated', 'Finance', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    });
  }

  selectActivePage(type: ActivePage): void {
    this.onFinanceTypeSelected.emit(type);
  }
}
