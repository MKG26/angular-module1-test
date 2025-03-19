import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './services/task.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
