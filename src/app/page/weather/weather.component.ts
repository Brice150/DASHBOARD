import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interfaces/user';
import { WeatherService } from '../../core/services/weather.service';
import { DayOfWeekPipe } from '../../shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from '../../shared/pipes/weatherImage.pipe';
import { WeatherUpdateDialogComponent } from '../../shared/components/dialogs/update/weather/weather-update-dialog.component';
import { UserService } from '../../core/services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, WeatherImagePipe],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @Input() user!: User;
  @Output() onCitySelected: EventEmitter<number> = new EventEmitter<number>();
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  weatherImagePipe: WeatherImagePipe = new WeatherImagePipe();

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private weatherService: WeatherService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getWeatherInfos();
  }

  getWeatherInfos(): void {
    this.weatherService
      .getWeatherInfo(this.user)
      .subscribe(
        ([
          firstWeatherInfo,
          secondWeatherInfo,
          thirdWeatherInfo,
          lastWeatherInfo,
        ]) => {
          this.user.weatherInfos.localWeathers[0] = firstWeatherInfo;
          this.user.weatherInfos.localWeathers[1] = secondWeatherInfo;
          this.user.weatherInfos.localWeathers[2] = thirdWeatherInfo;
          this.user.weatherInfos.localWeathers[3] = lastWeatherInfo;
          this.userService.saveUser(this.user);
        }
      );
  }

  openUpdateDialog(): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(WeatherUpdateDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((user: User) => !!user))
      .subscribe((user: User) => {
        this.userService.saveUser(user);
        this.user = this.userService.getUser();
        this.getWeatherInfos();
        this.toastr.success('Cities updated', 'Weather', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      });
  }

  selectCity(index: number): void {
    this.onCitySelected.emit(index);
  }
}
