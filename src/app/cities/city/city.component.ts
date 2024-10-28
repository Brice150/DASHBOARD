import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City, CityGeolocation } from '../../core/interfaces/city';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { WeatherImagePipe } from '../../shared/pipes/weather-image.pipe';
import { ToastrService } from 'ngx-toastr';
import { citiesGeolocation } from '../../shared/data/citiesGeolocation';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [
    CommonModule,
    WeatherImagePipe,
    LoadingComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent {
  @Input() city: City = {} as City;
  @Input() day?: string;
  @Input() index: number = 0;
  @Input() updateButtonAvailable: boolean = false;
  @Input() selectButtonAvailable: boolean = false;
  @Input() isSelected: boolean = false;
  modifyMode: boolean = false;
  @Output() saveCitiesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteCityEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectDateEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  toggleModifyMode(): void {
    if (this.modifyMode) {
      if (
        this.city.cityGeolocation.city &&
        this.city.cityGeolocation.city !== ''
      ) {
        const inputCity = this.city.cityGeolocation.city.toLowerCase().trim();

        const city: CityGeolocation | undefined = citiesGeolocation.find(
          (city: CityGeolocation) =>
            city.city.toLowerCase().trim() === inputCity
        );
        if (city) {
          this.city.cityGeolocation = city;
          this.saveCitiesEvent.emit();
          this.modifyMode = !this.modifyMode;
          this.toastr.success('City updated', 'Cities', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        } else {
          this.toastr.error('City is invalid', 'Cities', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        }
      } else {
        this.toastr.error('City is empty', 'Cities', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    } else {
      this.modifyMode = !this.modifyMode;
    }
  }

  deleteCity(): void {
    this.deleteCityEvent.emit();
  }

  selectDate(): void {
    if (!this.isSelected) {
      this.selectDateEvent.emit();
    }
  }
}
