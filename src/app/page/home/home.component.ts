import { Component } from '@angular/core';
import { PagedResponse, TaskDto } from '../../rest/task.restservice';
import { TaskTableComponent } from '../../component/task-table/task-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TaskFormComponent } from '../../component/task-form/task-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [TaskTableComponent, MatButtonModule, TaskFormComponent],
})
export class HomeComponent {
  tasksList!: PagedResponse<TaskDto>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tasks }) => {
      this.tasksList = tasks;
    });
  }

  goToTaskCreationPage() {
    this.router.navigate(['/task/create']);
  }
}
