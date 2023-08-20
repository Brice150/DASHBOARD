import { CommonModule } from "@angular/common";
import { PageComponent } from "./page.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WeatherModule } from "./weather/weather.module";
import { TasksModule } from "./tasks/tasks.module";
import { FinanceModule } from "./finance/finance.module";

@NgModule({
    declarations: [PageComponent],
    imports: [
      RouterModule,
      CommonModule,
      WeatherModule,
      TasksModule,
      FinanceModule
    ],
    exports: [PageComponent]
  })
  export class PageModule { }