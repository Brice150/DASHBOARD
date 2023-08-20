import { CommonModule } from "@angular/common";
import { TasksComponent } from "./tasks.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [TasksComponent],
    imports: [
      RouterModule,
      CommonModule
    ],
    exports: [TasksComponent]
  })
  export class TasksModule { }