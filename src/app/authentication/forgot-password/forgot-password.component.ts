import { Component, Inject } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { InternalRoutes } from "src/app/utils/internal-routes";
import {
  BackEndErrorMessages,
  BackEndResponse,
} from "src/app/utils/back-end-error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { LocalStorageToken } from "src/app/localstorage.token";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  forgetForm = this.formBuilder.group({
    userEmail: [null, [Validators.required, Validators.email]],
  });

  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackService: SnackService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  hide = true;

  forgetPassword() {
    this.spinnerService.loadSpinner();
    this.apiService.forget(this.forgetForm.value).subscribe({
      next: (resp) => {
        this.spinnerService.closeSpinner();
        this.localStorage.setItem("_id", resp._id);
        let changeUrlId = this.localStorage.getItem("_id");
        this.router.navigateByUrl(
          InternalRoutes.CHANGE_PASSWORD + "/" + changeUrlId
        );
      },
      error: (err) => {
        this.spinnerService.closeSpinner();
        let errMsg = err.error.message;
        if (errMsg == BackEndErrorMessages.NOT_A_MAIL) {
          errMsg = BackEndResponse.NOT_A_MAIL;
        }
        this.snackService.openSnackBar(errMsg, 2000, SnackClasses.ERROR);
      },
    });
  }
}
