import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../service/task-service';
import { TaskDto, TaskFormDto } from '../../rest/task.restservice';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  @Input() public task?: TaskDto;

  protected taskForm = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(4)]),
    complete: new FormControl(false, [Validators.required]),
  });
  protected title!: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.task) {
      this.title = 'Update a task';

      this.taskForm.patchValue({
        label: this.task.label,
        complete: this.task.complete,
      });
    } else {
      this.title = 'Add a task';
    }
  }

  async onSubmit() {
    const taskFormDto: TaskFormDto = {
      label: this.taskForm.get('label')!.value ?? '',
      complete: this.taskForm.get('complete')!.value ?? false,
    };

    if (this.task) {
      await this.taskService.updateTask(this.task.id, taskFormDto);
      this._snackBar.open('Task successfully updated', 'Ok', {
        duration: 3000,
      });
    } else {
      const createdTask = await this.taskService.createTask(taskFormDto);
      this._snackBar.open('Task successfully created', 'Ok', {
        duration: 3000,
      });
      this.router.navigate(['/task/' + createdTask.id]);
    }
  }

  errorHandling(controlName: string, validatorType: string): boolean {
    return this.taskForm.get(controlName)?.hasError(validatorType) ?? false;
  }
}
