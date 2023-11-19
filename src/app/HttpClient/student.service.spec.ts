import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { Student } from '../Models/Student';

describe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService],
    });

    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve students from the API via GET', () => {
    const dummyStudents: Student[] = [{ 
      id: 1,
      age: 25,
      degree: "Computer Science",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"

     }];

    service.getAllStudents().subscribe(students => {
      expect(students).toEqual(dummyStudents);
    });

    const req = httpTestingController.expectOne('http://localhost:5294/Students');
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudents);
  });

  it('should add a new student via POST', () => {
    const newStudent: Student = { 
      id: 1,
      age: 25,
      degree: "Computer Science",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"

     };

    service.postStudent(newStudent).subscribe(student => {
      expect(student).toEqual(newStudent);
    });

    const req = httpTestingController.expectOne('http://localhost:5294/Students');
    expect(req.request.method).toBe('POST');
    req.flush(newStudent);
  });

  it('should retrieve a student by ID via GET', () => {
    const studentId = 1;
    const dummyStudent: Student = { 
      id: 1,
      age: 25,
      degree: "Computer Science",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"

     };

    service.getStudentById(studentId).subscribe(student => {
      expect(student).toEqual(dummyStudent);
    });

    const req = httpTestingController.expectOne(`http://localhost:5294/Students/${studentId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudent);
  });

  it('should update a student via PUT', () => {
    const updatedStudent: Student = { 
      id: 1,
      age: 25,
      degree: "Arts",
      firstName: "John",
      lastName: "Edmundus",
      identifier: "12321321"
     };

    service.putStudent(updatedStudent).subscribe(student => {
      expect(student).toEqual(updatedStudent);
    });

    const req = httpTestingController.expectOne('http://localhost:5294/Students');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedStudent);
  });

  it('should delete a student via DELETE', () => {
    const studentId = 1;

    service.deleteStudent(studentId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:5294/Students/${studentId}`);
    expect(req.request.method).toBe('DELETE');
  });
});
