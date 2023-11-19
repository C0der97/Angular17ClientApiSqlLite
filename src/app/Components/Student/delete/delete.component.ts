import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../HttpClient/student.service';

@Component({
  selector: 'student-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  private studentsService = inject(StudentService)

  @Input() studentId: number = 0;
  @Output() closeDeleteModal = new EventEmitter<boolean>();
  @Output() loadStudents = new EventEmitter<boolean>();


  confirmDeleteStudent(){
    this.deleteStudent();
  }

  closeDeleteModalEmit(closeModalDelete:boolean){
    this.closeDeleteModal.emit(closeModalDelete);
  }

  deleteStudent(){
    if(this.studentId){
      this.studentsService.deleteStudent(this.studentId).subscribe(
        {
          next: () => {
          this.loadStudents.emit(true);
            this.closeDeleteModalEmit(true);
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
  }

}
