import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  @Input() user!: User;
}
