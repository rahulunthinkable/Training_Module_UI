import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserDetailService } from "src/app/service/User-detail-service/user-detail.service";
import { ApiService } from "src/app/service/auth-service/api.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { SuccessMessages } from "../../../../utils/success-messages";
import { SnackClasses } from "../../../../utils/snack-bar-classes";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
  hide = true;
  passMatch = false;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private userDetails: UserDetailService,
    private apiService: ApiService,
    private snackBarService: SnackService,
    private translateService: TranslateService
  ) {}

  changePasswordForm = this.formBuilder.group({
    oldPassword: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirm_password: [null, Validators.required],
  });


  matchPass() {
    if (
      this.changePasswordForm.controls["confirm_password"].value ==
      this.changePasswordForm.controls["password"].value
    ) {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }
  changePassword() {
    let userId = this.userDetails.getUserDetails().id
    if (this.changePasswordForm.valid) {
      this.apiService
        .change_password(this.changePasswordForm.value, userId)
        .subscribe({
          next: (resp) => {
            let successResponse = SuccessMessages.FORGET_SUCCESS;
            this.dialogRef.close();
            this.snackBarService.successSnackBar(successResponse)
          },
          error: (err) => {
            this.dialogRef.close();
            let errorMessege = err.error.message;
            this.snackBarService.errorSnackBar(errorMessege)
          },
        });
    }
  }
}
