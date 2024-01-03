import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {
  PagedResponse,
  TaskDto,
  TaskSearchDto,
} from '../../rest/task.restservice';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task-service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
})
export class TaskTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({ required: true }) public tasksList!: PagedResponse<TaskDto>;

  protected dataSource!: MatTableDataSource<TaskDto, MatPaginator>;
  protected searchDto: TaskSearchDto = {
    page: 0,
    pageSize: 5,
  };
  protected length?: number;
  protected pageIndex = 0;
  protected pageSize = 5;
  protected displayedColumns: string[] = ['label', 'complete'];

  // Private attributes
  private isFilteredOnComplete = false;

  constructor(private router: Router, private taskService: TaskService) {}

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TaskDto>(
      this.tasksList.content ?? []
    );
    this.length = this.tasksList.totalElements;
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  protected goToTask(id: string) {
    this.router.navigate(['/task/' + id]);
  }

  protected async handlePageEvent(e: PageEvent) {
    this.searchDto.pageSize = e.pageSize;
    this.searchDto.page = e.pageIndex;
    const res = await this.taskService.search(this.searchDto);
    this.dataSource.data = res.content;
    this.paginator.length = res.totalElements;
  }

  protected async searchTasks() {
    this.isFilteredOnComplete = !this.isFilteredOnComplete;
    this.searchDto.complete = this.isFilteredOnComplete;
    const tableResult = await this.taskService.search(this.searchDto);
    this.dataSource.data = tableResult.content;
    this.paginator.length = tableResult.totalElements;
  }
}
