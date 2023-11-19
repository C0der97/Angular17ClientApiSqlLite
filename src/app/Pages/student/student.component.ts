import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditComponent } from "../../Components/Student/create-edit/create-edit.component";
import { DeleteComponent } from "../../Components/Student/delete/delete.component";
import { ListComponent } from "../../Components/Student/list/list.component";

@Component({
    selector: 'app-student',
    standalone: true,
    templateUrl: './student.component.html',
    styleUrl: './student.component.css',
    imports: [CommonModule, CreateEditComponent, DeleteComponent, ListComponent]
})
export class StudentComponent {


  @ViewChild('studentListComponent') childComponent!: ListComponent;

  openModal = false;

  openDeleteModal = false;

  textBtnModalStudent = "";

  idStudentForDelete  = 0;

  idStudent: number = 0;

  loadStudentsAfterCreate = false;

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
    this.childComponent.loadStudents();
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
