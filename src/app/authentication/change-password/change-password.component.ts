import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import {
  BackEndErrorMessages,
  BackEndResponse,
} from "src/app/utils/back-end-error-messages";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { SuccessMessages } from "src/app/utils/success-messages";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
  hide = true;
  afterSignup = "";
  spinner = false;
  passMatch = false;

  @ViewChild("confirm") confirm!: ElementRef;

  changeForm = this.formBuilder.group({
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

  changePassword() {
    if (this.changeForm.valid) {
      this.spinnerService.loadSpinner();
      this.apiService.change_password(this.changeForm.value).subscribe({
        next: (resp) => {
          this.afterSignup = SuccessMessages.FORGET_SUCCESS;
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
          if (this.afterSignup == BackEndErrorMessages.SERVER_ERROR) {
            this.afterSignup = BackEndResponse.SERVER_ERROR;
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

  matchPass() {
    if (
      this.changeForm.controls["confirm_password"].value ==
      this.changeForm.controls["password"].value
    ) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }
}
