import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../models/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  viewTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number) {
    this.router.navigate(['/tasks', id, 'edit']);
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  getStatusClass(status: string) {
    return status.toLowerCase().replace(' ', '-');
  }
}
