import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AppUtil from '../common/app.util';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:3000/';

  constructor( private httpClient: HttpClient) { }

  createAccount(user) {
    return this.httpClient.post(`${this.url}users/register`, user);
  }

  auth(user){
    return this.httpClient.post(`${this.url}users/auth`, user);
  }

  saveUserData(token, user){
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
      
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }

  logout(){
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem(AppUtil.USER_INFO));
  }
}
