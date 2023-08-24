import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./weather.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [WeatherComponent],
    imports: [
      RouterModule,
      CommonModule,
      SharedModule
    ],
    exports: [WeatherComponent]
  })
  export class WeatherModule { }