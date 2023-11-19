import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CreateEditComponent } from './Components/Student/create-edit/create-edit.component';
import { DeleteComponent } from './Components/Student/delete/delete.component';
import { ListComponent } from './Components/Student/list/list.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,ListComponent, DeleteComponent, CreateEditComponent,HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
    expect(component.title).toEqual('Student');
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
