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

  /**
   * Create a task
   * @param taskFormDto creation information
   * @returns created task
   */
  createTask(taskFormDto: TaskFormDto): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient.create(taskFormDto).subscribe((response) => {
        resolve(response);
      });
    });
  }

  /**
   * Update a task with it's id
   * @param id task's id
   * @param taskFormDto update infos
   * @returns updated task
   */
  updateTask(id: number, taskFormDto: TaskFormDto): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient
        .update(id, taskFormDto)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  /**
   * Search a task
   * @param taskSearchDto search criterias
   * @returns search results (paginated)
   */
  search(taskSearchDto: TaskSearchDto): Promise<PagedResponse<TaskDto>> {
    return new Promise<PagedResponse<TaskDto>>((resolve) => {
      this.taskWebServiceClient.search(taskSearchDto).subscribe((response) => {
        resolve(response);
      });
    });
  }

  /**
   * Get a task by its id
   * @param id task's id
   * @returns the task
   */
  getById(id: number): Promise<TaskDto> {
    return new Promise<TaskDto>((resolve) => {
      this.taskWebServiceClient.getById(id).subscribe((response) => {
        resolve(response);
      });
    });
  }
}
