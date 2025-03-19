import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    createdAt: new Date(),
  };
  isEditMode = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      const existingTask = this.taskService.getTaskById(Number(id));
      if (existingTask) {
        this.task = { ...existingTask };
      } else {
        this.router.navigate(['/tasks']);
      }
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.addTask({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
      });
    }
    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
