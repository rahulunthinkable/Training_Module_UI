import { NgModule } from "@angular/core";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UserTableComponent } from "./user-table/user-table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { CreateCategoryComponent } from './create-category/create-category.component';

@NgModule({
  declarations: [UserTableComponent, CreateCourseComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TitleCasePipe],
})
export class AdminModule {}
