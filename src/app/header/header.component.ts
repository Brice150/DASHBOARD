import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: User = {} as User;
  @Output() onHideFinance: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
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
    this.user = this.userService.getUser();
    this.user.prefersDarkMode = !this.user.prefersDarkMode;
    this.userService.saveUser(this.user);
  }

  hideFinance(): void {
    this.user = this.userService.getUser();
    this.user.perfersFinanceHidden = !this.user.perfersFinanceHidden;
    this.userService.saveUser(this.user);
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
