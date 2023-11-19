import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteComponent } from './delete.component';
import { StudentService } from '../../../HttpClient/student.service';
import { of } from 'rxjs';
import { Student } from '../../../Models/Student';

describe('DeleteComponent', () => {
  let fixture: ComponentFixture<DeleteComponent>;
  let component: DeleteComponent;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(() => {
    studentService = jasmine.createSpyObj('StudentService', ['deleteStudent']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: StudentService, useValue: studentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
