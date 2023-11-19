import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditComponent } from './create-edit.component';
import { StudentService } from '../../../HttpClient/student.service';
import { provideHttpClient } from '@angular/common/http';

describe('CreateEditComponent', () => {
  let fixture: ComponentFixture<CreateEditComponent>;
  let component: CreateEditComponent;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(async () => {
    studentService = jasmine.createSpyObj('StudentService', ['putStudent', 'postStudent', 'getStudentById']);

    await TestBed.configureTestingModule({
      imports: [ CreateEditComponent ],
      providers: [
        provideHttpClient(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formStudent).toBeDefined();
    expect(component.formStudent.get('id')?.value).toEqual(0);
    expect(component.formStudent.get('firstName')?.value).toEqual("");
    expect(component.formStudent.get('lastName')?.value).toEqual("");
    expect(component.formStudent.get('degree')?.value).toEqual("");
    expect(component.formStudent.get('identifier')?.value).toEqual("");
    expect(component.formStudent.get('age')?.value).toEqual(0);
  });
});
