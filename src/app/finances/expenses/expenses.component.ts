import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../core/interfaces/user';
import Chart from 'chart.js/auto';
import { UserService } from '../../core/services/user.service';
import { Finance } from '../../core/interfaces/finance';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Color } from '../../core/enums/color.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent implements OnInit {
  user: User = {} as User;
  doughnutGraph?: Chart<'doughnut', number[], string>;
  colorKeys: (keyof typeof Color)[] = Object.keys(
    Color
  ) as (keyof typeof Color)[];
  Color = Color;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.displayIncomeGraph();
  }

  changeMode(): void {
    this.user = this.userService.getUser();
    this.updateIncomeGraph();
  }

  displayIncomeGraph(): void {
    const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';

    const graph = document.getElementById(
      'doughnutGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.doughnutGraph = new Chart(graph, {
        type: 'doughnut',
        data: {
          labels: this.user.expenses.map((finance: Finance) => finance.title),
          datasets: [
            {
              label: 'Expenses',
              data: this.user.expenses.map(
                (finance: Finance) => finance.totalAmount
              ),
              backgroundColor: this.user.expenses.map(
                (finance: Finance) => finance.color
              ),
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 40,
                font: {
                  size: 16,
                  weight: 800,
                },
                color: textColorSecondary,
              },
            },
          },
          color: '#006aff',
        },
      });
    }
  }

  updateIncomeGraph(): void {
    if (this.doughnutGraph) {
      const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';
      this.doughnutGraph.data.labels = this.user.expenses.map(
        (finance: Finance) => finance.title
      );
      this.doughnutGraph.data.datasets[0].data = this.user.expenses.map(
        (finance: Finance) => finance.totalAmount
      );
      this.doughnutGraph.data.datasets[0].backgroundColor =
        this.user.expenses.map((finance: Finance) => finance.color);
      this.doughnutGraph.options.plugins!.legend!.labels!.color =
        textColorSecondary;
      this.doughnutGraph.update();
    }
  }

  saveUserExpenses(): void {
    for (let expense of this.user.expenses) {
      if (!expense.totalAmount || expense.totalAmount < 0) {
        return;
      } else if (!expense.title || expense.title === '') {
        return;
      } else {
        this.userService.saveUserExpenses(this.user.expenses);
        this.updateIncomeGraph();
      }
    }
  }

  deleteExpense(index: number): void {
    if (this.user.expenses.length > 1) {
      this.user.expenses.splice(index, 1);
      this.saveUserExpenses();
      this.toastr.success('Expense deleted', 'Expenses', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    } else {
      this.toastr.error('One expense minimum', 'Expenses', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }

  addExpense(): void {
    const usedColors: Color[] = this.user.expenses.map(
      (expense) => expense.color
    );
    const unusedColors: Color[] = Object.values(Color).filter(
      (color) => !usedColors.includes(color)
    );
    console.log(usedColors, unusedColors);

    let newColor: Color = Color.BLUE;

    if (unusedColors.length !== 0) {
      newColor = unusedColors[0];
    } else {
      newColor = usedColors[Math.floor(Math.random() * usedColors.length)];
    }

    this.user.expenses.push({
      title: 'Expense',
      totalAmount: 100,
      color: newColor,
    });
    this.saveUserExpenses();
    this.toastr.success('Expense added', 'Expenses', {
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr custom',
    });
  }

  getTotal(): number {
    let total: number = 0;
    for (let expense of this.user.expenses) {
      total += expense.totalAmount;
    }
    return total;
  }
}
