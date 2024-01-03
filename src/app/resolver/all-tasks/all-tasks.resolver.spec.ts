import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { allTasksResolver } from './all-tasks.resolver';
import { PagedResponse, TaskDto } from '../../rest/task.restservice';

describe('allTasksResolver', () => {
  const executeResolver: ResolveFn<PagedResponse<TaskDto>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      allTasksResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
