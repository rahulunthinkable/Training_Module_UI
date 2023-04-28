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
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CourseComponent,
    CourseCardComponent,
    SideMenuComponent,
    SpinnerLoaderComponent,
    FilterComponent,
    DynamicTableComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    CourseComponent,
    SideMenuComponent,
    SpinnerLoaderComponent,
    FilterComponent,
    DynamicTableComponent,
    TranslateModule
  ],
})
export class SharedModule {}
