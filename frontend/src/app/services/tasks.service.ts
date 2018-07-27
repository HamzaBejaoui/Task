import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppUtil from '../common/app.util';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  createAuthHeader(headers: HttpHeaders) {
    const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
    headers.append('Authorization', `Bearer ${token}`);
  }

  saveTask(task) {
    const headers = new HttpHeaders();
    this.createAuthHeader(headers);
    return this.http.post(`${this.url}tasks/add`, task, { headers });
  }

  getTasks(query) {
    const headers = new HttpHeaders();
    this.createAuthHeader(headers);

    return this.http.post('tasks/list', query, {headers});
  }

  deleteTask(taskId){
    const headers = new HttpHeaders();
    this.createAuthHeader(headers);

    const url = `tasks/remove/${taskId}`;
    return this.http.delete(url, { headers })
  }
}
