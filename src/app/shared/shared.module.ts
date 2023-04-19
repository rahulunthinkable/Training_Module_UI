import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseComponent } from "./components/course/course.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { MaterialModule } from "../material/material.module";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseCardComponent,
    SideMenuComponent,
    ButtonComponent,
    SpinnerLoaderComponent,
  ],
  imports: [MaterialModule, CommonModule, RouterModule, HttpClientModule],
  exports: [CourseComponent, SideMenuComponent,SpinnerLoaderComponent],
})
export class SharedModule {}
