import { Component } from '@angular/core';
import { TaskFormComponent } from '../../component/task-form/task-form.component';
import { ActivatedRoute } from '@angular/router';
import { TaskDto } from '../../rest/task.restservice';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  task?: TaskDto;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
    });
  }
}
