import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserTableComponent } from './user-table/user-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AddSectionComponent } from './add-section/add-section.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SingleCourseComponent } from './single-course/single-course.component';
import { SavedSectionComponent } from './saved-section/saved-section.component';
import { CourseBasicInfoComponent } from './course-basic-info/course-basic-info.component';


@NgModule({
  declarations: [
    UserTableComponent,
    CreateCourseComponent,
    AddSectionComponent,
    SingleCourseComponent,
    SavedSectionComponent,
    CourseBasicInfoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ]
})
export class AdminModule { }
