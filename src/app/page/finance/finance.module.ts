import { CommonModule } from "@angular/common";
import { FinanceComponent } from "./finance.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [FinanceComponent],
    imports: [
      RouterModule,
      CommonModule,
      SharedModule
    ],
    exports: [FinanceComponent]
  })
  export class FinanceModule { }