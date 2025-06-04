import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../models/student.model';
import {Group} from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private readonly  baseUrl = 'https://68406c595b39a8039a580639.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/groups`);
  }

  getStudentByGroup(groupId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students&groupId=${groupId}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`,student);
  }

  deleteStudent(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
  }

}

