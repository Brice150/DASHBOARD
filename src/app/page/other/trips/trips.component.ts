import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { User } from '../../../core/interfaces/user';
import { UserService } from '../../../core/services/user.service';
import { ConfirmationDialogComponent } from '../../../shared/components/dialogs/confirmation/confirmation-dialog.component';
import { cloneDeep } from 'lodash';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  @Input() user!: User;
  imagePath: string = environment.imagePath;
  center: google.maps.LatLngLiteral = {
    lat: 48.8567,
    lng: 2.3522,
  };
  zoom = 4;
  marker: MapMarker = {} as MapMarker;
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  addMarker(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const newMarker: MapMarker = {} as MapMarker;
      newMarker.title = 'New City';
      newMarker.position = event.latLng.toJSON();
      this.user.trips.push(newMarker);
      this.saveAndUpdateUser();
      this.toastr.success('Trip added', 'Trip', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }

  openInfoWindow(markerElement: any, marker: MapMarker) {
    if (this.infoWindow) {
      this.marker = marker;
      this.infoWindow.open(markerElement);
    }
  }

  openDeleteWindow(markerElement: any, marker: MapMarker) {
    if (this.infoWindow) {
      this.marker = marker;
      this.infoWindow.open(markerElement);
    }
  }

  closeInfoWindow(): void {
    const index = this.user.trips.findIndex(
      (marker: MapMarker) =>
        marker.position.lat === this.marker.position.lat &&
        marker.position.lng === this.marker.position.lng
    );
    if (index !== -1) {
      this.user.trips[index] = this.marker;
      this.saveAndUpdateUser();
    }
  }

  deleteMarker(markerToDelete: MapMarker): void {
    const index = this.user.trips.findIndex(
      (marker: MapMarker) =>
        marker.position.lat === markerToDelete.position.lat &&
        marker.position.lng === markerToDelete.position.lng
    );
    if (index !== -1) {
      this.user.trips.splice(index, 1);
      this.saveAndUpdateUser();
      this.toastr.success('Trip deleted', 'Trip', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }

  saveAndUpdateUser(): void {
    this.userService.saveUser(this.user);
    this.user = this.userService.getUser();
  }
}
