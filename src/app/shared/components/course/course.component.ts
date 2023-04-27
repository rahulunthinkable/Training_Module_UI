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
  payload: any = {};
  limit = 10;
  skip = 0;
  filterOptions: any = courseFilter;
  constructor(
    private courseApiService: CourseService,
    private spinnerService: SpinnerService,
    private snackBarService: SnackService
  ) {}

  ngOnInit(): void {
    this.payload = {
      limit: this.limit,
      skip: this.skip,
    };
    const req1 = this.courseApiService.getAllCourse(this.payload).pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );
    let req2 = this.courseApiService.getAllCategories().pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );

    this.spinnerService.loadSpinner();

    forkJoin([req1, req2]).subscribe({
      next: (responseList: any) => {
        this.courseData = responseList[0];
        this.spinnerService.closeSpinner();
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

  selectedFilters(event: any) {
    event.forEach((filter: any) => {
      this.payload[Object.keys(filter)[0]] = filter[Object.keys(filter)[0]];
    });
    Object.keys(this.payload).forEach((param) => {
      if (this.payload[param] == null) {
        delete this.payload[param];
      }
    });
    this.payload.skip = 0;
    this.courseApiService.getAllCourse(this.payload).subscribe({
      next: (value: any) => {
        this.courseData = value;
      },
      error: (err) => {
        this.snackBarService.openSnackBar(
          ErrorMessages.SOMETHING_WENT_WRONG,
          100,
          SnackClasses.ERROR
        );
      },
    });
  }

  loadMoreCourses(event: any) {
    let scrollHeight=event.target.scrollHeight
    let offsetHeight=event.target.offsetHeight
    let scrollTop=event.target.scrollTop
    
    if(scrollTop>=scrollHeight-offsetHeight){      
      this.payload.skip+=10
      this.courseApiService.getAllCourse(this.payload).subscribe({
        next: (value: any) => {
          if(value[0]){
            this.courseData.push(value);
          }
        },
        error: (err) => {
          this.snackBarService.openSnackBar(
            ErrorMessages.SOMETHING_WENT_WRONG,
            100,
            SnackClasses.ERROR
          );
        },
      });
    }

  }
}
