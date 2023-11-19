import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { ListComponent } from '../../Components/Student/list/list.component';
import { DeleteComponent } from '../../Components/Student/delete/delete.component';
import { CreateEditComponent } from '../../Components/Student/create-edit/create-edit.component';
import { HttpClientModule } from '@angular/common/http';

describe('StudentComponent', () => {

  let fixture: ComponentFixture<StudentComponent>;
  let component: StudentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComponent,ListComponent, DeleteComponent, CreateEditComponent,HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StudentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.openModal).toBeFalsy();
    expect(component.openDeleteModal).toBeFalsy();
    expect(component.textBtnModalStudent).toEqual('');
    expect(component.idStudentForDelete).toEqual(0);
    expect(component.idStudent).toEqual(0);
    expect(component.loadStudentsAfterCreate).toBeFalsy();
  });

  it('should call openModalStudent with the correct parameter', () => {
    spyOn(component, 'openModalStudent');
    component.openCreateModalStudent(true);
    expect(component.openModalStudent).toHaveBeenCalledWith(true);
  });

  it('should call loadStudents on childComponent when loadStudents is called', () => {
    spyOn(component.childComponent, 'loadStudents');
    component.loadStudents(true);
    expect(component.childComponent.loadStudents).toHaveBeenCalled();
    expect(component.loadStudentsAfterCreate).toBeTruthy();
  });

});
