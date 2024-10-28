import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Country } from '../../../core/interfaces/country';
import { TripState } from '../../../core/enums/trip-state.enum';
import { countries } from '../../../shared/data/countries';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent implements OnInit, OnChanges {
  @Input() country: Country = {} as Country;
  @Input() updateStats: boolean = false;
  @Input() canBeModified: boolean = true;
  countryBeforeUpdate: Country = {} as Country;
  modifyMode: boolean = false;
  visited: string = '';
  toVisit: string = '';
  flagApi: string = '';
  countries = countries;
  @Output() deleteCountryEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveTripsEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.countryBeforeUpdate = this.country;
    this.getFlag();
    this.getStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['updateStats'] &&
      !changes['updateStats'].firstChange &&
      changes['updateStats'].currentValue
    ) {
      this.ngOnInit();
    }
  }

  deleteCountry(): void {
    this.deleteCountryEvent.emit();
  }

  toggleModifyMode(): void {
    if (this.modifyMode) {
      const newCountry: Country | undefined = countries.find(
        (country) =>
          country.name.toLowerCase() === this.country.name.toLowerCase()
      );
      if (newCountry) {
        this.country.code = newCountry.code;
        this.country.trips = this.countryBeforeUpdate.trips;
        this.saveTripsEvent.emit();
        this.toastr.success('Country updated', 'Trips', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      } else {
        this.toastr.error('Country is unknown', 'Trips', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    }
    this.modifyMode = !this.modifyMode;
  }

  getFlag(): void {
    const timestamp = new Date().getTime();
    this.flagApi = `https://flagcdn.com/w40/${this.country.code.toLowerCase()}.webp?timestamp=${timestamp}`;
  }

  getStats(): void {
    this.visited = '';
    this.toVisit = '';

    const visitedNumber: number =
      this.country.trips?.filter((trip) => trip.state === TripState.VISITED)
        .length ?? 0;
    const toVisitNumber: number =
      this.country.trips?.filter((trip) => trip.state === TripState.TO_VISIT)
        .length ?? 0;

    if (visitedNumber) {
      this.visited = `${visitedNumber} VISITED`;
    }
    if (toVisitNumber) {
      this.toVisit = `${toVisitNumber} TO VISIT`;
    }
  }
}
