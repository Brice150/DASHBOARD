import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent implements OnInit {
  user!: User;

  ngOnInit(): void {
    this.user = history.state['user'];
  }
}
