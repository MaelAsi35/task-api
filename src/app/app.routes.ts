import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { allTasksResolver } from './resolver/all-tasks/all-tasks.resolver';
import { CreateTaskComponent } from './page/create-task/create-task.component';
import { taskResolver } from './resolver/task/task.resolver';
import { TaskComponent } from './page/task/task.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { tasks: allTasksResolver },
  },
  {
    path: 'task',
    component: TaskComponent,
    children: [
      {
        path: 'create',
        component: CreateTaskComponent,
      },
      {
        path: ':taskId',
        component: CreateTaskComponent,
        resolve: { task: taskResolver },
      },
      { path: '', redirectTo: 'create', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
