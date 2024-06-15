import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../core/interfaces/user';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
