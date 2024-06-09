import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-finance-stock-exchange',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-stock-exchange.component.html',
  styleUrl: './finance-stock-exchange.component.css',
})
export class FinanceStockExchangeComponent implements OnInit {
  @Input() user!: User;

  ngOnInit(): void {}
}
