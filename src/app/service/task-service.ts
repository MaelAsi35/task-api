import { Injectable } from '@angular/core';
import {
  PagedResponse,
  TaskDto,
  TaskFormDto,
  TaskSearchDto,
  TaskWebServiceClient,
} from '../rest/task.restservice';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskWebServiceClient: TaskWebServiceClient) {}

  createTask(taskFormDto: TaskFormDto): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient.create(taskFormDto).subscribe((response) => {
        resolve(response);
      });
    });
  }

  updateTask(id: number, taskFormDto: TaskFormDto): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient
        .update(id, taskFormDto)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  search(taskSearchDto: TaskSearchDto): Promise<PagedResponse<TaskDto>> {
    return new Promise<PagedResponse<TaskDto>>((resolve) => {
      this.taskWebServiceClient.search(taskSearchDto).subscribe((response) => {
        resolve(response);
      });
    });
  }

  getById(id: number): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient.getById(id).subscribe((response) => {
        resolve(response);
      });
    });
  }
}
