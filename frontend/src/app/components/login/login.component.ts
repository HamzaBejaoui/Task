import { Component, OnInit } from '@angular/core';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password: string;

  constructor(
    private _flash: FlashMessagesService,
    private userService: UserService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onLogin(){
    if(!this.email || !this.password){
      this._flash.show('All field are required',{cssClass: 'alert-danger'});
      return false;
    }
    const user = {
      email: this.email,
      password: this.password
    }
    this.userService.auth(user).subscribe(
      resp => {
        if(!resp.success){
          this._flash.show(resp.message,{cssClass: 'alert-danger'});
        }
        this.userService.saveUserData(resp.token, resp.user);
        this.router.navigate(['/main'])
      }
    )
  }

}
