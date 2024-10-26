import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: User = {} as User;
  @Output() modeChangeEvent: EventEmitter<void> = new EventEmitter<void>();

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
    this.userService.saveUserDarkMode(this.user.prefersDarkMode);
    this.modeChangeEvent.emit();
  }

  isHomePage(): boolean {
    return this.router.url.endsWith('/');
  }

  back(): void {
    this.router.navigate(
      this.router.url
        .split('/')
        .filter(
          (elem) =>
            this.router.url.split('/').lastIndexOf(elem) !==
            this.router.url.split('/').length - 1
        )
    );
  }
}
