import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  
  constructor(
    private _flash: FlashMessagesService,
    private userService: UserService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onRegister(){
    if(!this.name || !this.email || !this.password) {
      this._flash.show('All field are required ', {cssClass: 'alert-danger'});
      return false;
    }
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    this.userService.createAccount(user).subscribe(
      resp => {
        if(!resp){
          this._flash.show('Failed to create account', {cssClass: 'alert-danger'});
          return false;
        }
        this._flash.show('Account created', {cssClass: 'alert-success'});
        return this.router.navigate(['/login']);
      }
    );
  }

}
