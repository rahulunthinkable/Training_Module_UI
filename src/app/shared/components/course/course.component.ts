import { Component, OnDestroy, OnInit } from "@angular/core";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { courseFilter } from "./course-filter/course-filter";
import { Subject, catchError, forkJoin, of, take, takeUntil } from "rxjs";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { actions } from "src/app/utils/util-constant";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit, OnDestroy {
  courseData: any;
  categories: any;
  payload: any = {};
  limit = 10;
  skip = 0;
  filterOptions: any = courseFilter;
  req1: any;
  req2: any;

  private destroy: Subject<boolean> = new Subject<boolean>();

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
    this.getCourseAndCategoryObservables(this.payload);
    this.getCoursesAndCategories(actions.ASSIGN, this.req1, this.req2);
  }

  selectedFilters(event: any) {
    event.forEach((filter: any) => {
      if (filter[Object.keys(filter)[0]]) {
        this.payload[Object.keys(filter)[0]] = filter[Object.keys(filter)[0]];
      } else {
        delete this.payload[Object.keys(filter)[0]];
      }
    });
    this.payload.skip = 0;
    this.getCourseAndCategoryObservables(this.payload);
    this.getCoursesAndCategories(actions.ASSIGN, this.req1);
  }

  loadMoreCourses(event: any) {
    let scrollHeight = event.target.scrollHeight;
    let offsetHeight = event.target.offsetHeight;
    let scrollTop = event.target.scrollTop;
    if (scrollTop >= scrollHeight - offsetHeight) {
      this.payload.skip += 10;
      this.getCourseAndCategoryObservables(this.payload);
      this.getCoursesAndCategories(actions.APPEND, this.req1);
    }
  }

  getCoursesAndCategories(action: any, req1: any, req2: any = of(null)) {
    this.spinnerService.loadSpinner();
    forkJoin([req1, req2])
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (responseList: any) => {
          this.spinnerService.closeSpinner();
          if (responseList[1]) {
            this.categories = responseList[1];
            this.filterOptions[0].options = this.categories.map(
              (category: any) => {
                category["viewValue"] = category.categoryName;
                return category;
              }
            );
          }
          if (action == actions.ASSIGN) {
            responseList[0] = responseList[0].map((data: any) => {
              this.categories.forEach((category: any) => {
                if (category._id == data.categoryId) {
                  data["categoryName"] = category.categoryName;
                }
              });
              return data;
            });
            this.courseData = responseList[0];
          }
          if (action == actions.APPEND) {
            if (responseList[0][0]) {
              responseList[0].forEach((course: any) => {
                this.categories.forEach((category: any) => {
                  if (category._id == course.categoryId) {
                    course["categoryName"] = category.categoryName;
                  }
                });
                this.courseData.push(course);
              });
            }
          }
        },
        error: (error) => {
          this.spinnerService.closeSpinner();
          this.snackBarService.openSnackBar(
            ErrorMessages.SOMETHING_WENT_WRONG,
            1000,
            SnackClasses.ERROR
          );
        },
      });
  }

  getCourseAndCategoryObservables(payload: any) {
    this.req1 = this.courseApiService.getAllCourse(payload).pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );
    this.req2 = this.courseApiService.getAllCategories().pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
