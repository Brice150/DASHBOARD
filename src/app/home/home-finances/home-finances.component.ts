import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceComponent } from '../../finances/finance/finance.component';
import { Finance } from '../../core/interfaces/finance';
import { Color } from '../../core/enums/color.enum';

@Component({
  selector: 'app-home-finances',
  standalone: true,
  imports: [CommonModule, RouterModule, FinanceComponent],
  templateUrl: './home-finances.component.html',
  styleUrl: './home-finances.component.css',
})
export class HomeFinancesComponent implements OnInit {
  @Input() totalAmount: number = 0;
  finance: Finance = {} as Finance;

  ngOnInit(): void {
    this.finance = {
      title: 'Total',
      totalAmount: this.totalAmount,
      color: Color.BLUE,
    };
  }
}
