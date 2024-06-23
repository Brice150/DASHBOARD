import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { TasksComponent } from './tasks/tasks.component';
import { TripsComponent } from './trips/trips.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [CommonModule, TasksComponent, TripsComponent, MatTabsModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css',
})
export class OtherComponent {
  @Input() user!: User;
}
