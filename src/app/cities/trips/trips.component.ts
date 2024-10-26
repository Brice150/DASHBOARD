import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/interfaces/user';
import { MatExpansionModule } from '@angular/material/expansion';
import { TripState } from '../../core/enums/trip-state.enum';
import { CountryComponent } from './country/country.component';
import { TripComponent } from './trip/trip.component';
import { Country } from '../../core/interfaces/country';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatExpansionModule,
    CountryComponent,
    TripComponent,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit {
  user: User = {} as User;
  countriesBeforeFilter: Country[] = [];
  updateStats: boolean[] = [];
  filterVisitedActive: boolean = false;
  filterToVisitActive: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.countriesBeforeFilter = this.user.countries;
    this.updateStats = new Array(this.user.countries.length).fill(true);
  }

  saveTrips(indexCountry?: number): void {
    this.countriesBeforeFilter = this.user.countries;
    this.userService.saveUserTrips(this.user.countries);
    if (indexCountry !== undefined) {
      this.triggerUpdateStats(indexCountry);
    }
  }

  addTrip(indexCountry: number): void {
    this.user.countries[indexCountry].trips?.push({
      city: 'City',
      state: TripState.TO_VISIT,
    });
    this.saveTrips(indexCountry);
  }

  addCountry(): void {
    this.user.countries.push({
      name: 'France',
      code: 'FR',
      trips: [{ city: 'City', state: TripState.TO_VISIT }],
    });
    this.updateStats.push(true);
    this.saveTrips(this.updateStats.length - 1);
  }

  deleteTrip(indexCountry: number, indexTrip: number): void {
    if (this.user.countries[indexCountry].trips?.length === 1) {
      this.toastr.error('One city minimum', 'Trip', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    } else {
      this.user.countries[indexCountry].trips?.splice(indexTrip, 1);
    }
    this.saveTrips(indexCountry);
  }

  deleteCountry(indexCountry: number): void {
    this.user.countries.splice(indexCountry, 1);
    this.saveTrips();
  }

  triggerUpdateStats(indexCountry: number): void {
    this.updateStats[indexCountry] = false;
    setTimeout(() => {
      this.updateStats[indexCountry] = true;
    }, 50);
  }

  filterVisited(): void {
    this.user.countries = this.countriesBeforeFilter;
    if (!this.filterVisitedActive) {
      this.user.countries = this.user.countries.filter((country) =>
        country.trips?.some((trip) => trip.state === TripState.VISITED)
      );
    }
    this.filterVisitedActive = !this.filterVisitedActive;
    this.filterToVisitActive = false;
  }

  filterToVisit(): void {
    this.user.countries = this.countriesBeforeFilter;
    if (!this.filterToVisitActive) {
      this.user.countries = this.user.countries.filter((country) =>
        country.trips?.some((trip) => trip.state === TripState.TO_VISIT)
      );
    }
    this.filterVisitedActive = false;
    this.filterToVisitActive = !this.filterToVisitActive;
  }
}
