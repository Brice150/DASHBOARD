import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./weather.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [WeatherComponent],
    imports: [
      RouterModule,
      CommonModule
    ],
    exports: [WeatherComponent]
  })
  export class WeatherModule { }