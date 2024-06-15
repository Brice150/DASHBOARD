import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../core/interfaces/user';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent implements OnInit {
  user!: User;

  ngOnInit(): void {
    this.user = history.state['user'];
  }
}
