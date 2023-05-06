import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { SuccessMessages } from "src/app/utils/success-messages";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent {
  categories: any;
  constructor(
    private categoryService: CourseService,
    private snackService: SnackService,
    private formBuiler: FormBuilder,
    private dialogRef:DialogRef<CreateCategoryComponent>,
    private snackBarService:SnackService
  ) {}
  categoryForm = this.formBuiler.group({
    categoryName: [null, Validators.required],
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (err) => {
        this.snackService.openSnackBar(
          err.error.message,
          1000,
          SnackClasses.ERROR
        );
      },
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (value) => {
          this.dialogRef.close()
          this.snackBarService.successSnackBar(SuccessMessages.CREATE_CATEGORY_SUCCESS)
        },
        error:(err)=>{
          this.dialogRef.close()
          this.snackBarService.errorSnackBar()
        }
      });
    }
  }
}
