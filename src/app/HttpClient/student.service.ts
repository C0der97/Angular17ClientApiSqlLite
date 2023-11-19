import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../Models/Student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private httpClient = inject(HttpClient);

  readonly apiUrl = "http://localhost:5294";

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor() { 
     
  }

  getAllStudents(){
    return this.httpClient.get<Student[]>(this.apiUrl+"/Students");
  }

  postStudent(student: Student){
    return this.httpClient.post<Student>(this.apiUrl+"/Students",student);
  }

  getStudentById(id: number){
    return this.httpClient.get<Student>(this.apiUrl+"/Students/"+id);
  }

  putStudent(student: Student){
    return this.httpClient.put<Student>(this.apiUrl+"/Students",student);
  }

  deleteStudent(id:number){
    return this.httpClient.delete<Student>(this.apiUrl+"/Students/"+id);
  }
}
