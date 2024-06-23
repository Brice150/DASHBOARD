import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Task, User } from '../../core/interfaces/user';
import { UserService } from '../../core/services/user.service';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation/confirmation-dialog.component';
import { TasksDialogComponent } from '../../shared/components/dialogs/tasks/tasks-dialog.component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { random } from 'lodash';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() user!: User;
  treeControl = new NestedTreeControl<Task>((node) => node.subtasks);
  dataSource = new MatTreeNestedDataSource<Task>();
  expandedNodeSet = new Set<number>();

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.user.tasks;
  }

  hasChild = (_: number, node: Task) =>
    !!node.subtasks && node.subtasks.length > 0;

  isTask(node: Task): boolean {
    return !!this.user.tasks.find((task: Task) => task.id === node.id);
  }

  updateTask(node: Task): void {
    const dialogData = {
      taskName: node.name,
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((taskName: string) => !!taskName))
      .subscribe((taskName: string) => {
        const index = this.user.tasks.findIndex(
          (task: Task) => task.id === node.id
        );
        if (index !== -1) {
          this.user.tasks[index].name = taskName;
          this.saveAndUpdateTree();
          this.toastr.success('Task updated', 'Task', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        }
      });
  }

  updateSubtask(node: Task): void {
    const dialogData = {
      taskName: node.name,
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((taskName: string) => !!taskName))
      .subscribe((taskName: string) => {
        this.user.tasks.forEach((task: Task) => {
          const index = task.subtasks?.findIndex(
            (subtask: Task) => subtask.id === node.id
          );
          if (index !== undefined && index !== -1) {
            task.subtasks![index].name = taskName;
            this.saveAndUpdateTree();
            this.toastr.success('Subtask updated', 'Task', {
              positionClass: 'toast-top-center',
              toastClass: 'ngx-toastr custom',
            });
            return;
          }
        });
      });
  }

  addTask(parentNode?: Task): void {
    let task: Task;
    if (!parentNode) {
      if (!this.user.tasks || this.user.tasks.length === 0) {
        this.user.tasks = [];
        task = { name: 'New Task', id: this.generateId() };
      } else {
        task = {
          name: 'New Task',
          id: this.generateId(),
        };
      }
      this.user.tasks.push(task);
      this.saveAndUpdateTree();
      this.toastr.success('Task added', 'Task', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    } else {
      const index = this.user.tasks.findIndex(
        (task: Task) => task.id === parentNode.id
      );
      if (index !== -1) {
        if (
          !this.user.tasks[index].subtasks ||
          this.user.tasks[index].subtasks?.length === 0
        ) {
          this.user.tasks[index].subtasks = [];
          task = { name: 'New Task', id: this.generateId() };
        } else {
          task = {
            name: 'New Task',
            id: this.generateId(),
          };
        }
        this.user.tasks[index].subtasks!.push(task);
        this.saveAndUpdateTree();
        this.toastr.success('Subtask added', 'Task', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    }
  }

  generateId(): number {
    return random(1, 1000000);
  }

  saveAndUpdateTree(): void {
    this.userService.saveUser(this.user);
    this.user = this.userService.getUser();
    this.saveExpansionState();
    this.dataSource.data = this.user.tasks;
    this.restoreExpansionState();
  }

  saveExpansionState(): void {
    this.expandedNodeSet.clear();
    this.dataSource.data.forEach((node) => {
      this.checkExpansionState(node);
    });
  }

  checkExpansionState(node: Task): void {
    if (this.treeControl.isExpanded(node)) {
      this.expandedNodeSet.add(node.id);
    }
    if (node.subtasks) {
      node.subtasks.forEach((subtask) => this.checkExpansionState(subtask));
    }
  }

  restoreExpansionState(): void {
    this.dataSource.data.forEach((node) => {
      this.expandNodes(node);
    });
  }

  expandNodes(node: Task): void {
    if (this.expandedNodeSet.has(node.id)) {
      this.treeControl.expand(node);
    }
    if (node.subtasks) {
      node.subtasks.forEach((subtask) => this.expandNodes(subtask));
    }
  }

  deleteTask(node: Task): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((res: boolean) => !!res))
      .subscribe(() => {
        const index = this.user.tasks.findIndex(
          (task: Task) => task.id === node.id
        );
        if (index !== -1) {
          this.user.tasks.splice(index, 1);
          this.saveAndUpdateTree();
          this.toastr.success('Task deleted', 'Task', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        }
      });
  }

  deleteSubtask(node: Task): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((res: boolean) => !!res))
      .subscribe(() => {
        this.user.tasks.forEach((task: Task) => {
          const index = task.subtasks?.findIndex(
            (subtask: Task) => subtask.id === node.id
          );
          if (index !== undefined && index !== -1) {
            task.subtasks!.splice(index, 1);
            this.saveAndUpdateTree();
            this.toastr.success('Subtask deleted', 'Task', {
              positionClass: 'toast-top-center',
              toastClass: 'ngx-toastr custom',
            });
            return;
          }
        });
      });
  }
}
