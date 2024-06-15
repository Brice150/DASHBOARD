import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { User } from '../core/interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user!: User;
  @Output() onHideFinance: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    }
    this.handleMode();
  }

  handleMode(): void {
    if (this.user.prefersDarkMode) {
      document.body.classList.add('dark-theme-variables');
    } else {
      document.body.classList.remove('dark-theme-variables');
    }
  }

  changeMode(): void {
    document.body.classList.toggle('dark-theme-variables');
    this.user.prefersDarkMode = !this.user.prefersDarkMode;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  hideFinance(): void {
    this.user.perfersFinanceHidden = !this.user.perfersFinanceHidden;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
    this.onHideFinance.emit();
  }

  isHomePage(): boolean {
    return (
      !this.router.url.includes('weather') &&
      !this.router.url.includes('finance') &&
      !this.router.url.includes('stock') &&
      !this.router.url.includes('real')
    );
  }
}
