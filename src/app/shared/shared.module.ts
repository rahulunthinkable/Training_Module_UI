import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseComponent } from "./components/course/course.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { MaterialModule } from "../material/material.module";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { RouterModule } from "@angular/router";
import { SpinnerLoaderComponent } from "./components/spinner-loader/spinner-loader.component";
import { FilterComponent } from "./components/filter/filter.component";
import { DynamicTableComponent } from "./components/dynamic-table/dynamic-table.component";
import { UserProfileComponent } from "./components/user-profile/user-profile/user-profile.component";
import { EditProfileComponent } from "./components/user-profile/edit-profile/edit-profile.component";
import { ViewProfileComponent } from "./components/user-profile/view-profile/view-profile.component";
import { ProfileComponent } from "./components/user-profile/view-profile/profile/profile.component";
import { ChangePasswordComponent } from "./components/user-profile/change-password/change-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CourseDetailComponent } from './components/course-detail/course-detail/course-detail.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseCardComponent,
    SideMenuComponent,
    SpinnerLoaderComponent,
    FilterComponent,
    DynamicTableComponent,
    UserProfileComponent,
    EditProfileComponent,
    ViewProfileComponent,
    ProfileComponent,
    ChangePasswordComponent,
    CourseDetailComponent,
  ],

  exports: [
    CourseComponent,
    SideMenuComponent,
    SpinnerLoaderComponent,
    FilterComponent,
    DynamicTableComponent,
    UserProfileComponent,
    EditProfileComponent,
    ViewProfileComponent,
    ProfileComponent,
    ChangePasswordComponent,
    TranslateModule

  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],

})
export class SharedModule {}
