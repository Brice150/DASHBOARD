import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { User } from '../../core/interfaces/user';
import { UserService } from '../../core/services/user.service';
import { HeaderComponent } from '../../header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-exchange',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './stock-exchange.component.html',
  styleUrl: './stock-exchange.component.css',
})
export class StockExchangeComponent implements OnInit {
  user: User = {} as User;
  barGraph?: Chart<'bar', number[], string>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.calculateAmounts(false);
    this.displayStockExchangeGraph();
  }

  changeMode(): void {
    this.user = this.userService.getUser();
    this.updateStockExchangeGraph();
  }

  displayStockExchangeGraph(): void {
    const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';

    const graph = document.getElementById(
      'barGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.barGraph = new Chart(graph, {
        type: 'bar',
        data: {
          labels: this.user.stockExchange.yearly.date,
          datasets: [
            {
              label: 'Invested',
              data: this.user.stockExchange.yearly.invested,
              backgroundColor: '#006aff',
            },
            {
              label: 'Interests',
              data: this.user.stockExchange.yearly.interests,
              backgroundColor: '#45d606',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  size: 16,
                  weight: 800,
                },
                color: textColorSecondary,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Years',
                font: {
                  size: 18,
                  weight: 800,
                },
                color: '#006aff',
              },
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: 'transparent',
              },
              border: {
                color: textColorSecondary,
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Total Amount (€)',
                font: {
                  size: 18,
                  weight: 800,
                },
                color: '#006aff',
              },
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: textColorSecondary,
              },
              border: {
                color: textColorSecondary,
              },
            },
          },
        },
      });
    }
  }

  updateStockExchangeGraph(): void {
    if (this.barGraph) {
      const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';
      this.barGraph.data.labels = this.user.stockExchange.yearly.date;
      this.barGraph.data.datasets = [
        {
          label: 'Invested',
          data: this.user.stockExchange.yearly.invested,
          backgroundColor: '#006aff',
        },
        {
          label: 'Interests',
          data: this.user.stockExchange.yearly.interests,
          backgroundColor: '#45d606',
        },
      ];
      this.barGraph.options.plugins!.legend!.labels!.color = textColorSecondary;
      this.barGraph.options.scales!['x']!.ticks!.color = textColorSecondary;
      this.barGraph.options.scales!['x']!.border!.color = textColorSecondary;
      this.barGraph.options.scales!['y']!.ticks!.color = textColorSecondary;
      this.barGraph.options.scales!['y']!.grid!.color = textColorSecondary;
      this.barGraph.options.scales!['y']!.border!.color = textColorSecondary;
      this.barGraph.update();
    }
  }

  calculateAmounts(hasUpdatedAmounts: boolean): void {
    if (
      this.user.stockExchange.yearly.interests.length !== 41 ||
      this.user.stockExchange.yearly.invested.length !== 41 ||
      this.user.stockExchange.yearly.total.length !== 41 ||
      hasUpdatedAmounts
    ) {
      this.user.stockExchange.yearly.invested[0] =
        this.user.stockExchange.totalAmount;
      this.user.stockExchange.yearly.interests[0] = 0;
      this.user.stockExchange.yearly.total[0] =
        this.user.stockExchange.totalAmount;

      for (
        let index = 1;
        index < this.user.stockExchange.yearly.date.length;
        index++
      ) {
        let invested: number =
          this.user.stockExchange.yearly.invested[index - 1];
        let interests: number =
          this.user.stockExchange.yearly.interests[index - 1];

        invested += this.user.stockExchange.amountPerMonth * 12;
        interests +=
          (invested + interests) * (this.user.stockExchange.percentage / 100);

        this.user.stockExchange.yearly.invested[index] = invested;
        this.user.stockExchange.yearly.interests[index] = interests;
        this.user.stockExchange.yearly.total[index] = invested + interests;
      }
      this.userService.saveUserStockExchange(this.user.stockExchange);
    }
  }

  saveUserStockExchange(): void {
    if (
      this.user.stockExchange.totalAmount === undefined ||
      this.user.stockExchange.totalAmount === null ||
      this.user.stockExchange.totalAmount < 0
    ) {
      return;
    } else if (
      this.user.stockExchange.amountPerMonth === undefined ||
      this.user.stockExchange.amountPerMonth === null ||
      this.user.stockExchange.amountPerMonth < 0
    ) {
      return;
    } else if (
      this.user.stockExchange.percentage === undefined ||
      this.user.stockExchange.percentage === null ||
      this.user.stockExchange.percentage < 1
    ) {
      return;
    } else {
      this.userService.saveUserStockExchange(this.user.stockExchange);
      this.calculateAmounts(true);
      this.updateStockExchangeGraph();
    }
  }
}
