import { Task } from '../models/task.interface';

export class TaskService {
  private tasks: Task[] = [];
  private lastId = -1;

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));

      this.lastId = Math.max(...this.tasks.map((task) => task.id), this.lastId);
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: ++this.lastId,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);

    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }
}
