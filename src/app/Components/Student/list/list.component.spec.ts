import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { StudentService } from '../../../HttpClient/student.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(() => {
    studentService = jasmine.createSpyObj('StudentService', ['getAllStudents']);

    studentService.getAllStudents.and.returnValue(of([{ 
      id: 1,
      age: 25,
      degree: "Computer Science",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"
     }
    ]));

    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: StudentService, useValue: studentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'ngOnInit').and.callFake(() => {
      console.log('Mock Function');
    });

    spyOn(component, 'loadStudents').and.returnValue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on ngOnInit', () => {
    component.ngOnInit();

    expect(component.students()).toEqual([{ 
      id: 1,
      age: 25,
      degree: "Computer Science",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"
     }]);
  });

});
