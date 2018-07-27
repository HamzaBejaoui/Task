import { TasksService } from './../../services/tasks.service';
import { UserService } from './../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  name;
  done;
  owner;
  constructor(
    private userService: UserService,
    private router: Router,
    private flash: FlashMessagesService,
    private tasks: TasksService
  ) { }

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.owner = user.id;
    this.done = false;
  }

  onAddTask() {
    if (!this.name) {
      this.flash.show('Task name is required', { cssClass: 'alert-danger' });
    }
    const task = {
      name: this.name,
      owner: this.owner,
      done: this.done
    }
    // console.log(task);
    this.tasks.saveTask(task).subscribe(resp => {
      this.flash.show('Task Saved', { cssClass: 'alert-success' });
      this.router.navigate(['/main']);
    })
  }

}
