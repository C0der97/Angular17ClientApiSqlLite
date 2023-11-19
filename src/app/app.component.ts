import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./Components/Student/list/list.component";
import { DeleteComponent } from "./Components/Student/delete/delete.component";
import { CreateEditComponent } from "./Components/Student/create-edit/create-edit.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, ListComponent, DeleteComponent, CreateEditComponent]
})
export class AppComponent {
  openModal = false;

  openDeleteModal = false;

  textBtnModalStudent = "";

  idStudentForDelete  = 0;

  idStudent: number = 0;

  loadStudentsAfterCreate = false;

  title = 'Student';

  ngOnInit() {
  }

  openCreateModalStudent(openModal: boolean){
    this.textBtnModalStudent = "Create Student";
    this.idStudent = 0;
    this.openModalStudent(openModal);
  }

  openEditModalStudent(idStudent:number){
    this.textBtnModalStudent = "Edit Student";
    this.idStudent = idStudent;
    this.openModalStudent(true);
  }

  openDeleteModalStudent(idStudent:number){
    this.idStudent = idStudent;
    this.closeModalDeleteStudent(true);
  }

  openModalStudent(openModal:boolean){
    this.openModal = openModal;
  }

  closeModalDeleteStudent(openModal:boolean){
    this.openDeleteModal = openModal;
  }

  loadStudents(loadStudents: boolean){
    this.loadStudentsAfterCreate = loadStudents;
  }

  closeStudentModal() {
    this.openModal = false;
  }

  closeCancelConfirmModal(closeModalDeleteStudent:boolean){
    this.openDeleteModal = !closeModalDeleteStudent;
  }

  openCancelConfirmModal(id: number) {
    this.openDeleteModal = true;
    this.idStudentForDelete = id;
  }
}
