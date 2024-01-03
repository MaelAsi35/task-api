import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskWebServiceClient {
  constructor(protected httpClient: HttpClient) {}

  search(searchTaskDto: TaskSearchDto): Observable<PagedResponse<TaskDto>> {
    // TODO: clean this
    let httpParams: HttpParams = new HttpParams()
      .set('page', searchTaskDto.page!)
      .set('size', searchTaskDto.pageSize!);
    if (searchTaskDto.complete) {
      httpParams = httpParams.append('complete', searchTaskDto.complete);
    }
    if (searchTaskDto.label) {
      httpParams = httpParams.append('label', searchTaskDto.label);
    }
    return this.httpClient.get<PagedResponse<TaskDto>>(this.getUri(``), {
      params: httpParams,
    });
  }

  getById(id: number): Observable<TaskDto> {
    return this.httpClient.get<TaskDto>(this.getUri(`/${id}`));
  }

  create(taskFormDto: TaskFormDto): Observable<TaskDto> {
    return this.httpClient.post<TaskDto>(this.getUri(``), taskFormDto);
  }

  update(id: number, taskFormDto: TaskFormDto): Observable<TaskDto> {
    return this.httpClient.put<TaskDto>(this.getUri(`/${id}`), taskFormDto);
  }

  private getUri(uri: string): string {
    return '/api/task' + uri;
  }
}

export class TaskDto {
  id!: number;
  label!: string;
  complete!: boolean;
}

export class TaskFormDto {
  label?: string;
  complete?: boolean;
}

export class PagedRequest {
  page?: number;
  pageSize?: number;
}

export class TaskSearchDto extends PagedRequest {
  label?: string;
  complete?: boolean;
}

export class PagedResponse<T> {
  totalElements?: number;
  pageIndex?: number;
  totalPages?: number;
  content!: T[];
}
