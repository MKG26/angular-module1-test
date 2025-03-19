import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.task = this.taskService.getTaskById(Number(id));

    if (!this.task) {
      this.router.navigate(['/tasks']);
    }
  }

  editTask() {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id, 'edit']);
    }
  }

  deleteTask() {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/tasks']);
    }
  }

  getStatusClass(status: string) {
    return status.toLowerCase().replace(' ', '-');
  }
}
