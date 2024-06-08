import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-finance-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-income.component.html',
  styleUrl: './finance-income.component.css',
})
export class FinanceIncomeComponent {
  @Input() user!: User;
}
