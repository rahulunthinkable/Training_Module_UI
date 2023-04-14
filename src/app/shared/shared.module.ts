import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './components/course/course.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CourseComponent,
    CourseCardComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [CourseComponent]
})
export class SharedModule { }
