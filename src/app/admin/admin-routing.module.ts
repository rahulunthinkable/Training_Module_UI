import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from '../shared/components/course/course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile/user-profile.component';
import { EditProfileComponent } from '../shared/components/user-profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from '../shared/components/user-profile/view-profile/view-profile.component';
import { CourseDetailComponent } from '../shared/components/course-detail/course-detail/course-detail.component';
import { AdminGuard } from '../guards/admin-routing-guard/admin-guard.guard';

const routes: Routes = [
  {
    path: "",
    component: CourseComponent,
  },
  {
    path: "users",
    component: UserTableComponent,
    canActivate:[AdminGuard]
  },
  {
    path: "create-course",
    component: CreateCourseComponent,
  },
  {
    path: "profile",
    component: UserProfileComponent,
    children: [
      {
        path: "",
        component: ViewProfileComponent,
      },
      {
        path: "edit-profile",
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: "user",
    component: UserProfileComponent,
    children: [
      {
        path: ":id",
        component: ViewProfileComponent,
      },
    ],
  },
  {
    path:'course/:id',
    component: CourseDetailComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
