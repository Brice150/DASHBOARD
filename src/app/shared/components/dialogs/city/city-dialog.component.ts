import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { citiesGeolocation } from '../../../data/citiesGeolocation';
import { User } from '../../../../core/interfaces/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityGeolocation } from '../../../../core/interfaces/weatherInfos';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-city-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css'],
})
export class CityDialogComponent implements OnInit {
  user!: User;
  cities!: CityGeolocation[];

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cities = cloneDeep(this.data.user.weatherInfos.cities);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  validate(): void {
    if (this.isFormValid()) {
      const citiesToSave: CityGeolocation[] = [];
      this.cities.forEach((newCity: CityGeolocation) => {
        const city: CityGeolocation | undefined = citiesGeolocation.find(
          (city: CityGeolocation) =>
            city.city.toLowerCase().trim() === newCity.city.toLowerCase().trim()
        );
        if (city) {
          citiesToSave.push(city);
        } else {
          this.toastr.error(newCity.city + ' could not be found', 'Weather', {
            positionClass: 'toast-top-center',
          });
        }
      });
      if (citiesToSave.length === 4) {
        this.data.user.weatherInfos.cities = citiesToSave;
        localStorage.setItem('userDashboard', JSON.stringify(this.data.user));
        this.dialogRef.close(true);
      }
    } else {
      this.toastr.error('At least one city is missing', 'Weather', {
        positionClass: 'toast-top-center',
      });
    }
  }

  isFormValid(): boolean {
    return (
      this.cities &&
      this.cities.length === 4 &&
      !this.cities.some((city: CityGeolocation) => city.city === '')
    );
  }
}
