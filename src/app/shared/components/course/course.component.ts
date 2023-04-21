import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { courseFilter } from "./course-filter/course-filter";
import { catchError, forkJoin, of, take } from "rxjs";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SnackClasses } from "src/app/utils/snack-bar-classes";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  courseData: any;
  categories: any;
  filterOptions: any = courseFilter;
  constructor(
    private courseApiService: CourseService,
    private spinnerService: SpinnerService,
    private snackBarService: SnackService
  ) {}

  ngOnInit(): void {
    const req1 = this.courseApiService.getAllCourse().pipe(take(1),catchError((err)=>{
      return of(null)
    }))
    let req2 = this.courseApiService.getAllCategories().pipe(take(1),catchError((err)=>{
      return of(null)
    }))

    this.spinnerService.loadSpinner()

    forkJoin([req1, req2]).subscribe({
      next: (responseList: any) => {
        this.courseData = responseList[0];
        this.spinnerService.closeSpinner();
        this.courseData = this.courseData.map((course: any) => {
          course.image = `data:image/png;base64,${course.image}`;
          return course;
        });
        this.categories = responseList[1];
        this.filterOptions[0].options = this.categories.map((category: any) => {
          category["viewValue"] = category.categoryName;
          return category;
        });
      },
      error: (error) => {
        this.snackBarService.openSnackBar(
          ErrorMessages.SOMETHING_WENT_WRONG,
          100,
          SnackClasses.ERROR
        );
      },
    });
  }

  selectedFilters(event: Event) {}
}
