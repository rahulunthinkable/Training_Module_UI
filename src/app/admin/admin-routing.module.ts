import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from '../shared/components/course/course.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {
    path:'',
    component:CourseComponent,
  },
  {
    path:'users',
    component:UserTableComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
