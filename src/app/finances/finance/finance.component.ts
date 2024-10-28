import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Finance } from '../../core/interfaces/finance';
import { environment } from '../../../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Color } from '../../core/enums/color.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
})
export class FinanceComponent {
  imagePath: string = environment.imagePath;
  @Input() finance: Finance = {} as Finance;
  @Input() updateButtonAvailable: boolean = false;
  modifyMode: boolean = false;
  colorKeys: (keyof typeof Color)[] = Object.keys(
    Color
  ) as (keyof typeof Color)[];
  Color = Color;
  @Output() saveFinancesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteFinanceEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  toggleModifyMode(): void {
    if (this.modifyMode) {
      if (!this.finance.totalAmount) {
        this.finance.totalAmount = 0;
      }
      if (!this.finance.title) {
        this.finance.title = 'Savings';
      }
      if (!this.finance.color) {
        this.finance.color = Color.BLUE;
      }
      this.saveFinancesEvent.emit();
      this.toastr.success('Finance updated', 'Finances', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
    this.modifyMode = !this.modifyMode;
  }

  deleteFinance(): void {
    this.deleteFinanceEvent.emit();
  }
}
