import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../Models/Student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private httpClient = inject(HttpClient);

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor() { 
     
  }

  getAllStudents(){
    return this.httpClient.get<Student[]>("http://localhost:5294/Students");
  }

  postStudent(student: Student){
    return this.httpClient.post<Student>("http://localhost:5294/Students",student);
  }

  getStudentById(id: number){
    return this.httpClient.get<Student>("http://localhost:5294/Students/"+id);
  }

  putStudent(student: Student){
    return this.httpClient.put<Student>("http://localhost:5294/Students",student);
  }

  deleteStudent(id:number){
    return this.httpClient.delete<Student>("http://localhost:5294/Students/"+id);
  }
}
