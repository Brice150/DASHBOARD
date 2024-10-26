import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MainTask } from '../../core/interfaces/task';
import { TaskComponent } from '../../tasks/task/task.component';

@Component({
  selector: 'app-home-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskComponent, MatExpansionModule],
  templateUrl: './home-tasks.component.html',
  styleUrl: './home-tasks.component.css',
})
export class HomeTasksComponent {
  @Input() mainTasks: MainTask[] = [];
  alreadyOneExpanded: boolean = false;
}
