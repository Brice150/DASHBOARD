import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StateColor, TripState } from '../../../core/enums/trip-state.enum';
import { Trip } from '../../../core/interfaces/trip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent {
  @Input() trip: Trip = {} as Trip;
  @Input() canBeModified: boolean = true;
  modifyMode: boolean = false;
  states = Object.values(TripState);
  @Output() deleteTripEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveTripsEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  deleteTrip(): void {
    this.deleteTripEvent.emit();
  }

  toggleModifyMode(): void {
    if (this.modifyMode) {
      this.saveTripsEvent.emit();
      this.toastr.success('Trip updated', 'Trips', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
    this.modifyMode = !this.modifyMode;
  }

  getColor(state: TripState): string {
    return StateColor.get(state) || '#000000';
  }
}
