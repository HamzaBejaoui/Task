import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: any;

  constructor(
    private taskService: TasksService,
    private userService: UserService,
    private flash: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchTasks();
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).subscribe(resp => {
      if (!resp.success) {
        this.flash.show(resp.message, { cssClass: 'alert-danger' });
      } else {
        this.fetchTasks();
        this.flash.show('Task Deleted', { cssClass: 'alert-success' });
      }
      this.router.navigate(['/main']);
    });
  }

  editTask(taskId){
    //TODO :Implement me
  }

  private fetchTasks() {
    const currentUser = this.userService.getCurrentUser();
    const query = { owner: currentUser.id };
    this.taskService.getTasks(query).subscribe(
      resp => {
        this.tasks = resp.tasks;
      }
    )
  }

}
