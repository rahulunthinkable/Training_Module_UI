import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import {
  BackEndErrorMessages,
  BackEndResponse,
} from "src/app/utils/back-end-error-messages";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { SuccessMessages } from "src/app/utils/success-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUPComponent {
  hide = true;
  selected = false;
  showLabel = false;
  afterSignup = "";
  spinner = false;
  passMatch = false;

  @ViewChild("confirm") confirm!: ElementRef;

  registerForm = this.formBuilder.group({
    userName: ["", [Validators.required, Validators.minLength(2)]],
    userEmail: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirm_password: [null, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackService: SnackService,
    private spinnerService: SpinnerService
  ) {}

  register() {
    this.selected = true;
    if (this.userNameNotNumber()) {
      this.snackService.openSnackBar(
        SuccessMessages.USER_NAME_NUMBER,
        2500,
        SnackClasses.HALF_SUCCESS
      );
      return;
    }
    if (this.registerForm.valid) {
      if (
        this.confirm.nativeElement.value !=
        this.registerForm.controls["password"].value
      ) {
      } else {
        this.spinnerService.loadSpinner();
        this.apiService.signup(this.registerForm.value).subscribe({
          next: (resp) => {
            this.afterSignup = SuccessMessages.SIGNUP_SUCCESS;
            this.showLabel = true;
            this.snackService.openSnackBar(
              this.afterSignup,
              1000,
              SnackClasses.SUCCESS
            );
            this.spinnerService.closeSpinner();
            this.router.navigateByUrl(InternalRoutes.LOGIN_PAGE);
          },
          error: (err) => {
            this.spinnerService.closeSpinner();
            this.afterSignup = err.error.message;
            this.showLabel = true;
            if (this.afterSignup == BackEndErrorMessages.NOT_A_MAIL) {
              this.afterSignup = BackEndResponse.NOT_A_MAIL;
            }
            this.snackService.openSnackBar(
              this.afterSignup,
              2000,
              SnackClasses.ERROR
            );
          },
        });
      }
    }
  }

  userNameNotNumber() {
    if (!isNaN(Number(this.registerForm.controls["userName"].value))) {
      return true;
    }
    return false;
  }

  matchPass() {
    if (
      this.registerForm.controls["confirm_password"].value ==
      this.registerForm.controls["password"].value
    ) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }
}
