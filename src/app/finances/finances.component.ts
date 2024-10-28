import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { FinanceComponent } from './finance/finance.component';
import { RouterModule } from '@angular/router';
import { Color } from '../core/enums/color.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FinanceComponent, RouterModule],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.css',
})
export class FinancesComponent implements OnInit {
  user: User = {} as User;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  saveFinances(): void {
    this.userService.saveUserFinances(this.user.finances);
  }

  addFinance(): void {
    this.user.finances.push({
      title: 'Finance',
      totalAmount: 0,
      color: Color.BLUE,
    });
    this.saveFinances();
    this.toastr.success('Finance added', 'Finances', {
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr custom',
    });
  }

  deleteFinance(index: number): void {
    if (this.user.finances.length === 1) {
      this.toastr.error('One finance minimum', 'Finances', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    } else {
      this.user.finances.splice(index, 1);
      this.saveFinances();
      this.toastr.success('Finance deleted', 'Finances', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }
}
