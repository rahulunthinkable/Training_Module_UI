import { Component, OnInit } from "@angular/core";
import { UserDetailService } from "src/app/service/User-detail-service/user-detail.service";
import { UserDetails } from "./user.model";
import { UserService } from "../services/user-detail-service";
import { ActivatedRoute } from "@angular/router";
import { SpinnerService } from "src/app/service/spinner/spinner.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { ErrorMessages } from "src/app/utils/error-messages";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.scss"],
})
export class ViewProfileComponent implements OnInit {
  userDetails!: UserDetails;
  adminViewMode = false;
  userId: any;
  constructor(
    private userDetaisService: UserDetailService,
    private userDetail: UserService,
    private route: ActivatedRoute,
    private loaderService: SpinnerService,
    private snackBarService: SnackService,
    private tranlateService:TranslateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      if (param?.id) {
        this.adminViewMode = true;
        this.userId = param.id;
      }
    });
    if (!this.adminViewMode) {
      this.userDetails = this.userDetaisService.getUserDetails();
      this.userDetail.userName.next(this.userDetails.name);
    } else {
      this.loaderService.loadSpinner();
      this.userDetaisService.getUserDetailApi(this.userId).subscribe({
        next: (value: any) => {
          this.loaderService.closeSpinner();
          this.userDetails = value;
          this.userDetail.userName.next(this.userDetails.name);
        },
        error: (err) => {
          this.loaderService.closeSpinner();
          this.snackBarService.openSnackBar(
            this.tranlateService.instant(ErrorMessages.SOMETHING_WENT_WRONG),
            1000,
            SnackClasses.ERROR
          );
        },
      });
    }
  }
}
