import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent implements OnInit {
  @Input() user!: User;

  ngOnInit(): void {}
}