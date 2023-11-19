import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../../Models/Student';
import { StudentService } from '../../../HttpClient/student.service';

@Component({
  selector: 'student-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.css'
})
export class CreateEditComponent {


  @Input() studentId: number = 0;
  @Input() textBtnModalStudent: string = "";

  @Output() openCreateEditModal = new EventEmitter<boolean>();
  @Output() loadStudents = new EventEmitter<boolean>();

  openModalStudent(openModal: boolean) {
    this.openCreateEditModal.emit(openModal);
  }

  ngOnInit() {
  }

  ngafterViewInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentId']
    && this.studentId != 0) {
        this.getStudentById();
    }
  }

  private studentsService = inject(StudentService)

  formStudent = new FormGroup({
    'id' : new FormControl(0,Validators.required),
    'firstName' : new FormControl("",Validators.required),
    'lastName' : new FormControl("",Validators.required),
    'age' : new FormControl(0,[Validators.required,Validators.min(1),Validators.max(100)]),
    'degree' : new FormControl("",Validators.required),
    'identifier' : new FormControl("",Validators.required),
  });

  get age() {
    return this.formStudent.get('age');
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

  editStudent(student : Student) {
    this.studentsService.putStudent(student).subscribe(
      {
        next: () => {
          this.loadStudents.emit(true);
          this.openModalStudent(false);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  addStudent(student : Student) {
    this.studentsService.postStudent(student).subscribe(
      {
        next: () => {
          this.loadStudents.emit(true);
          this.openModalStudent(false);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
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

  getStudentById() {
    this.studentsService.getStudentById(this.studentId).subscribe(
      {
        next: (student : Student) => {
          this.formStudent.setValue({
            id: student.id,
            age: student.age || 0,
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            degree: student.degree || '',
            identifier: student.identifier || '',
          });
          this.openModalStudent(true);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }


}
