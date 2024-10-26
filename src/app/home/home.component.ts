import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainTask } from '../core/interfaces/task';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { HomeCitiesComponent } from './home-cities/home-cities.component';
import { HomeFinancesComponent } from './home-finances/home-finances.component';
import { HomeTasksComponent } from './home-tasks/home-tasks.component';
import { TaskState } from '../core/enums/task-state.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeCitiesComponent,
    HomeFinancesComponent,
    HomeTasksComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User = {} as User;
  totalAmount: number = 0;
  mainTasks: MainTask[] = [];
  states = Object.values(TaskState);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.user.finances.forEach(
      (finance) => (this.totalAmount = this.totalAmount + finance.totalAmount)
    );
    this.mainTasks =
      this.states
        .map((state) =>
          this.user.mainTasks.filter(
            (mainTask: MainTask) => mainTask.state === state
          )
        )
        .find((tasks) => tasks.length > 0) || [];
  }
}
