import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent {
  @Input() user!: User;
}
