import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [TasksComponent],
})
export class TasksModule {}
