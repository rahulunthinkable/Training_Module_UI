import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, flatMap } from "rxjs";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import {
  BackEndErrorMessages,
  BackEndResponse,
} from "src/app/utils/back-end-error-messages";
import { SuccessMessages } from "src/app/utils/success-messages";
import { InternalRoutes } from "src/app/utils/internal-routes";
import { LocalStorageToken } from "src/app/localstorage.token";
import { SnackClasses } from "src/app/utils/snack-bar-classes";

@Component({
  selector: "app-login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class Login {
  showLabel = false;
  afterLogin = "";
  spinner = false;

  toggle = new Subject();
  loginForm = new FormGroup({
    userEmail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private apiService: ApiService,
    private router: Router,
    private snackService: SnackService,
    private spinnerService: SpinnerService
  ) {}

  hide = true;

  login() {
    if (this.loginForm.valid) {
      this.spinnerService.loadSpinner();
      this.apiService.login(this.loginForm.value).subscribe({
        next: (resp) => {
          this.afterLogin = SuccessMessages.LOGIN_SUCCESS;
          this.showLabel = true;
          this.snackService.openSnackBar(
            this.afterLogin,
            1000,
            SnackClasses.SUCCESS
          );
          this.spinnerService.closeSpinner();
          this.localstorage.setItem("token", resp.token);
          this.router.navigateByUrl(InternalRoutes.ADMIN);
        },
        error: (err) => {
          this.spinnerService.closeSpinner();
          this.afterLogin = err.error.message;
          this.showLabel = true;
          if (this.afterLogin == BackEndErrorMessages.NOT_A_MAIL) {
            this.afterLogin = BackEndResponse.NOT_A_MAIL;
          }
          this.snackService.openSnackBar(
            this.afterLogin,
            2000,
            SnackClasses.ERROR
          );
        },
      });
    }
  }
}
