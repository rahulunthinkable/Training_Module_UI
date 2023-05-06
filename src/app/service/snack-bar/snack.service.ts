import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";

@Injectable({
  providedIn: "root",
})
export class SnackService {
  constructor(private _snackBar: MatSnackBar,private translateService:TranslateService) {}

  openSnackBar(message: string, time: any, snackType: any) {
    this._snackBar.open(message, "X", {
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: snackType,
    });
    setTimeout(() => {
      this._snackBar.dismiss();
    }, time);
  }

  successSnackBar(message: any) {
    this.openSnackBar(this.translateService.instant(message), 2000, SnackClasses.SUCCESS);
  }

  errorSnackBar(message?: any) {
    let snackMesage = message ? message : ErrorMessages.SOMETHING_WENT_WRONG;
    this.openSnackBar(this.translateService.instant(snackMesage), 2000, SnackClasses.ERROR);
  }
  halfSuccessSnackBar(message?: any) {}
  halfErrorSnackBar(message?: any) {}
}
