import { CommonModule } from "@angular/common";
import { FinanceComponent } from "./finance.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [FinanceComponent],
    imports: [
      RouterModule,
      CommonModule
    ],
    exports: [FinanceComponent]
  })
  export class FinanceModule { }