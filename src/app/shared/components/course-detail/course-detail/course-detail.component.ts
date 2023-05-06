import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { TranslateService } from "@ngx-translate/core";
import { catchError, forkJoin, of, take } from "rxjs";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.scss"],
})
export class CourseDetailComponent implements OnInit {
  courseId!: string;
  courseData: any;
  categories: any | undefined;
  req1: any;
  req2: any;
  constructor(
    private route: ActivatedRoute,
    private courseApiService: CourseService,
    private spinnerService: SpinnerService,
    private snackBarService: SnackService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe((res) => {
      this.courseId = res["id"];
    });    
    this.getCourseDetail(this.courseId);
  }

  getCourseDetail(courseId: string) {
    this.spinnerService.loadSpinner();
    this.getCourseAndCategoryObservable(courseId);
    forkJoin([this.req1, this.req2]).subscribe({
      next: (responseList: any) => {
        this.spinnerService.closeSpinner();
        if (responseList[0]) {
          this.categories = responseList[0];
        }
        if (responseList[1]) {
          this.courseData = responseList[1];          
          this.categories.forEach((category: any) => {
            if (category._id == this.courseData.categoryId) {
              this.courseData["categoryName"] = category.categoryName;
            }
          });
        }
      },
      error: (err) => {
        this.spinnerService.closeSpinner()
        this.snackBarService.errorSnackBar(err.error.message)
        setTimeout(() => {
          history.go(-1);
        }, 1500);
      },
    });
  }

  getCourseAndCategoryObservable(courseId: any) {
    this.req2 = this.courseApiService.getCourseDetails(courseId).pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );
    this.req1 = this.courseApiService.getAllCategories().pipe(
      take(1),
      catchError((err) => {
        return of(null);
      })
    );
  }
}
