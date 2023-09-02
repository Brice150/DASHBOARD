import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CityGeolocation } from 'src/app/core/interfaces/cityGeolocation';
import { User } from 'src/app/core/interfaces/user';
import { citiesGeolocation } from 'src/app/shared/data/citiesGeolocation';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {
  user!: User;
  city!: string;

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.user = this.data.user;
    this.city = this.user.city;
  }

  close() {
    this.dialogRef.close(false);
  }

  validate() {
    if (this.city && citiesGeolocation.some((cityGeolocation) => cityGeolocation.city.toLowerCase().trim() === this.city.toLowerCase().trim())) {
      this.user.city = this.city.toLowerCase().trim();
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
      this.dialogRef.close(true);
    } else {
      this.toastr.error('City is invalid', 'Weather', {
        positionClass: 'toast-top-center' 
      });
    }
  }
}