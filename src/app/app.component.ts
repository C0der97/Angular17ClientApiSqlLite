import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './HttpClient/student.service';
import { Injectable,inject } from '@angular/core';
import { Student } from './Models/Student';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  students = signal<Student[]>([]);

  openModal = false;
  openDeleteModal = false;

  textBtnModalStudent = "";

  idStudentForDelete  = 0;

  formStudent = new FormGroup({
    'id' : new FormControl(0,Validators.required),
    'firstName' : new FormControl("",Validators.required),
    'lastName' : new FormControl("",Validators.required),
    'age' : new FormControl(0,[Validators.required,Validators.min(1),Validators.max(100)]),
    'degree' : new FormControl("",Validators.required),
    'identifier' : new FormControl("",Validators.required),
  });

  private studentsService = inject(StudentService)

  title = 'Student';

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(){
    this.studentsService.getAllStudents().subscribe(
      {
        next: (students) => {
          console.log(students);

          this.students.set(students);
        },
        error: (err) => {
          console.log(err);
        }
      }

    );
  }

  get age() {
    return this.formStudent.get('age');
  }

  openStudentModal(edit: boolean = false) {
    this.textBtnModalStudent = "Create Student";
    if(edit){
      this.textBtnModalStudent = "Edit Student";
    }
    this.openModal = true;
  }

  closeStudentModal() {
    this.openModal = false;
  }

  closeCancelConfirmModal() {
    this.openDeleteModal = false;
  }

  openCancelConfirmModal(id: number) {
    this.openDeleteModal = true;
    this.idStudentForDelete = id;
  }

  getStudentById(id: number) {
    this.studentsService.getStudentById(id).subscribe(
      {
        next: (student : Student) => {
          console.log(student);
          this.formStudent.setValue({
            id: student.id,
            age: student.age || 0,
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            degree: student.degree || '',
            identifier: student.identifier || '',
          });
          this.openStudentModal(true);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  submitStudent(){
    const student : Student = {
      id: this.formStudent.get('id')?.value || 0,
      age: this.formStudent.get("age")?.value,
      firstName: this.formStudent.get("firstName")?.value,
      lastName: this.formStudent.get("lastName")?.value,
      degree: this.formStudent.get("degree")?.value,
      identifier: this.formStudent.get("identifier")?.value,
    };

    if(student.id != 0){
      this.editStudent(student);
      return;
    }

    this.addStudent(student);
  }

  addStudent(student : Student) {
    this.studentsService.postStudent(student).subscribe(
      {
        next: (student) => {
          this.closeStudentModal();
          this.loadStudents();
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  editStudent(student : Student) {
    this.studentsService.putStudent(student).subscribe(
      {
        next: (student) => {
          this.closeStudentModal();
          this.loadStudents();
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  deleteStudent(){
    if(this.idStudentForDelete){
      this.studentsService.deleteStudent(this.idStudentForDelete).subscribe(
        {
          next: (student : Student) => {
            this.closeCancelConfirmModal();
            this.loadStudents();
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
  }

  upAge(){
    if(this.age){
      let age = this.age.value || 0;
      if(this.checkMaxAge(age)){ return; }
      this.age.setValue(age + 1);
    }
  }

  downAge(){
    if(this.age){
      let age = this.age.value || 0;
      if(this.checkMinAge(age)){ return; }
      this.age.setValue(age - 1);
    }
  }

  checkMaxAge(age:number){
    return age > 99;
  }

  checkMinAge(age:number){
    return age < 1;
  }
}
