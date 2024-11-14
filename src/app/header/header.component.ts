import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: User = {} as User;
  @Output() modeChangeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

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

  importData(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userService.importUser(JSON.parse(reader.result as string));
        location.reload();
        this.toastr.success('Data imported', 'Data', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      };
      reader.readAsText(file);
    }
  }

  downloadData(): void {
    this.user = this.userService.getUser();
    const blob = new Blob([JSON.stringify(this.user, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user.json';
    link.click();
    window.URL.revokeObjectURL(url);
    this.toastr.success('Data downloaded', 'Data', {
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr custom',
    });
  }
}
