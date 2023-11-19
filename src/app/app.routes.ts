import { Routes } from '@angular/router';
import { StudentComponent } from './Pages/student/student.component';

export const routes: Routes = [
  { path: 'Students', component: StudentComponent },
  { path: '', redirectTo: '/Students', pathMatch: 'full' },
];
