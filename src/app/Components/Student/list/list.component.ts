import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../HttpClient/student.service';
import { Student } from '../../../Models/Student';

@Component({
  selector: 'students-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() loadStudentsData: boolean = false;
  @Output() openEditModal = new EventEmitter<number>();
  @Output() openCreateModal = new EventEmitter<boolean>();
  @Output() openDeleteModal = new EventEmitter<number>();

  private studentsService = inject(StudentService)
  
  students = signal<Student[]>([]);

  ngOnInit() {
    this.loadStudents();
  }

  editStudent(idNumber: number) {
    this.openEditModal.emit(idNumber);
  }

  deleteStudent(idNumber: number) {
    this.openDeleteModal.emit(idNumber);
  }

  openModalStudent(openModal: boolean) { 
    this.openCreateModal.emit(openModal);
  }

  loadStudents(){
    this.studentsService.getAllStudents().subscribe(
      {
        next: (students) => {
          this.students.set(students);
        },
        error: (err) => {
          console.log(err);
        }
      }

    );
  }
}
