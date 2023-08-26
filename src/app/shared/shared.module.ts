import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DayOfWeekPipe } from "./pipes/dayOfWeek.pipe";
import { WeatherImagePipe } from "./pipes/weatherImage.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { CityDialogComponent } from "./components/dialogs/city-dialog/city-dialog.component";
import { WeatherDialogComponent } from "./components/dialogs/weather-dialog/weather-dialog.component";
import { StrategyDialogComponent } from "./components/dialogs/strategy-dialog/strategy-dialog.component";
import { TasksDialogComponent } from "./components/dialogs/tasks-dialog/tasks-dialog.component";
import { FinanceDialogComponent } from "./components/dialogs/finance-dialog/finance-dialog.component";

@NgModule({
    declarations: [
        DayOfWeekPipe,
        WeatherImagePipe,
        WeatherDialogComponent,
        CityDialogComponent,
        StrategyDialogComponent,
        TasksDialogComponent,
        FinanceDialogComponent
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
        WeatherDialogComponent,
        CityDialogComponent,
        StrategyDialogComponent,
        TasksDialogComponent,
        FinanceDialogComponent
    ]
})
export class SharedModule {}