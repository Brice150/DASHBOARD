import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.css'],
})
export class TasksDialogComponent implements OnInit {
  taskName!: string;

  constructor(
    public dialogRef: MatDialogRef<TasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskName: string },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.taskName = cloneDeep(this.data.taskName);
  }

  close(): void {
    this.dialogRef.close(null);
  }

  validate(): void {
    if (this.taskName && this.taskName.trim() !== '') {
      this.dialogRef.close(this.taskName);
    } else {
      this.toastr.error('Task is empty', 'Task', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }
}
