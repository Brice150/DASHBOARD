import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-city.component.html',
  styleUrl: './weather-city.component.css',
})
export class WeatherCityComponent {
  @Input() user!: User;
  @Input() index!: number;
}
