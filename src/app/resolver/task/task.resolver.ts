import { ResolveFn } from '@angular/router';
import { TaskDto } from '../../rest/task.restservice';
import { inject } from '@angular/core';
import { TaskService } from '../../service/task-service';

export const taskResolver: ResolveFn<TaskDto> = (route, state) => {
  const id: number = Number(route.paramMap.get('taskId'));
  return inject(TaskService).getById(id);
};
