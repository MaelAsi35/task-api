import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  PagedResponse,
  TaskDto,
  TaskSearchDto,
  TaskWebServiceClient,
} from '../../rest/task.restservice';

export const allTasksResolver: ResolveFn<PagedResponse<TaskDto>> = (
  _route,
  _state
) => {
  const taskSearchDto: TaskSearchDto = {
    page: 0,
    pageSize: 5,
  };
  return inject(TaskWebServiceClient).search(taskSearchDto);
};
