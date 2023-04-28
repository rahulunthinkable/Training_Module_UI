import { BreakpointObserver } from "@angular/cdk/layout";
import { StepperOrientation } from "@angular/cdk/stepper";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map, Observable, Subject, takeUntil } from "rxjs";
import { CourseService } from "src/app/service/course-service/course-service.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { UserDetailService } from "src/app/service/User-detail-service/user-detail.service";
import { SuccessMessages } from "src/app/utils/success-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { ErrorMessages } from "src/app/utils/error-messages";

@Component({
  selector: "app-create-course",
  templateUrl: "./create-course.component.html",
  styleUrls: ["./create-course.component.scss"],
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  public courseNameGroup!: FormGroup;
  public categoryGroup!: FormGroup;
  public descriptionGroup!: FormGroup;

  private destroy: Subject<boolean> = new Subject<boolean>();

  isLinear: boolean = true;
  categoryList: any;
  stepperOrientation!: Observable<StepperOrientation>;
  courseFormData = new FormData();
  isVerticalStepper: boolean = false;
  verticalStepper = "vertical";
  userData: any;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private breakpointObserver: BreakpointObserver,
    private loggedInUser: UserDetailService,
    private snackbarService: SnackService
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  ngOnInit(): void {
    this.userData = this.loggedInUser.getUserDetails();
    this.stepperOrientation.pipe(takeUntil(this.destroy)).subscribe((res) => {
      if (res === this.verticalStepper) {
        this.isVerticalStepper = true;
      } else {
        this.isVerticalStepper = false;
      }
    });
    this.createCourseForm();
    this.getCategoryList();
  }

  createCourseForm() {
    this.courseNameGroup = this.fb.group({
      courseName: ["", Validators.required],
    });
    this.categoryGroup = this.fb.group({
      category: ["", Validators.required],
    });
    this.descriptionGroup = this.fb.group({
      description: [""],
    });
  }

  fileChange(event: any) {
    const file: File = event.target.files[0];
    const ele = document.getElementById("filename")!;
    ele.innerText = file.name;
    if (file) {
      this.courseFormData.set("image", file);
    }
  }

  resetFileName() {
    const ele = document.getElementById("filename")!;
    ele.innerText = "";
  }

  validateCourseName() {
    if (this.courseNameGroup && !isNaN(Number(this.courseNameGroup.value.courseName))) {
      return true;
    }
    return false;
  }

  submitCourseForm() {
    if (this.validateCourseName()) {
      this.snackbarService.openSnackBar(
        ErrorMessages.COURSE_NAME_ERROR,
        1000,
        SnackClasses.ERROR)
      return;
    }
    this.courseFormData.set(
      "courseName",
      this.courseNameGroup.value.courseName
    );
    this.courseFormData.set("categoryId", this.categoryGroup.value.category);
    this.courseFormData.set(
      "creatorName",
      this.userData ? this.userData.name : ""
    );
    this.courseFormData.set(
      "creatorId",
      this.userData ? this.userData.id : ""
    );
    this.courseFormData.set(
      "courseDescription",
      this.descriptionGroup.value.description
    );
    this.courseService
      .createCourse(this.courseFormData)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            SuccessMessages.CREATE_COURSE_SUCCESS,
            1000,
            SnackClasses.SUCCESS
          );
        },
        (err) => {
          this.snackbarService.openSnackBar(
            ErrorMessages.SOMETHING_WENT_WRONG,
            1000,
            SnackClasses.ERROR
          );
        }
      );
    
  }

  getCategoryList() {
    this.courseService
      .getAllCategories()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res) => {
          this.categoryList = res;
        },
        (err) => {
          this.snackbarService.openSnackBar(
            ErrorMessages.SOMETHING_WENT_WRONG,
            1000,
            SnackClasses.ERROR
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
