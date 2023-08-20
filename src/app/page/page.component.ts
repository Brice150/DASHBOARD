import { Component, OnInit } from '@angular/core';
import { User } from '../core/interface/user';
@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  user: User = {} as User;

  ngOnInit(){
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    } else {
      this.generateDefaultUser();
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
    }
    if (this.user.prefersDarkMode) {
      this.changeMode();
    }
  }

  generateDefaultUser() {
    this.user = {
      prefersDarkMode: false,
      ETF: 'S&P500',
      city: 'Paris'
    };
  }

  changeMode() {
    document.body.classList.toggle('dark-theme-variables');
    this.user.prefersDarkMode = document.body.classList.contains('dark-theme-variables');
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }
}
