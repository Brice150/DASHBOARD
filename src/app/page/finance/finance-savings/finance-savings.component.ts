import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-finance-savings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-savings.component.html',
  styleUrl: './finance-savings.component.css',
})
export class FinanceSavingsComponent {
  @Input() user!: User;
}
