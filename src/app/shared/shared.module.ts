import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { WeatherDialogComponent } from "./components/weather-dialog/weather-dialog.component";
import { DayOfWeekPipe } from "./pipes/dayOfWeek.pipe";
import { WeatherImagePipe } from "./pipes/weatherImage.pipe";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
        DayOfWeekPipe,
        WeatherImagePipe,
        WeatherDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatDialogModule
    ],
    exports: [
        DayOfWeekPipe,
        WeatherImagePipe, 
        WeatherDialogComponent
    ]
})
export class SharedModule {}