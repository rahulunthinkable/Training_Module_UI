import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from "@angular/core";
import { SpinnerService } from "./service/spinner/spinner.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { LocalStorageToken } from "./localstorage.token";
import { Storage_variables } from "./utils/local-storage-variable";
import { InternalRoutes } from "./utils/internal-routes";
import { UserDetailService } from "./service/User-detail-service/user-detail.service";
import { roles } from "./utils/util-constant";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewChecked {
  title = "LearningResources";
  spinnerArr: any = [];
  subject: any;
  route!: string;

  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private spinnerService: SpinnerService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private location: Location,
    private userDetails:UserDetailService
  ) {}

  ngOnInit() {
    this.subject = this.spinnerService.spinnerSubject;
    this.subject.subscribe((data: any) => {
      if (data) {
        this.spinnerArr.push(true);
      } else {
        this.spinnerArr.pop();
      }
    });
  }
  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    this.router.events.subscribe((val) => {
      if (
        this.localstorage.getItem(Storage_variables.token) &&
        !this.location.path().includes(InternalRoutes.LOGIN_PAGE) &&
        this.location.path() != ""
      ) {
        if(!(this.location.path().includes(InternalRoutes.USERS) && this.userDetails.getUserDetails().role!=roles.ADMIN))
        this.localstorage.setItem(
          Storage_variables.last_route,
          this.location.path()
        );
      }
    });
  }
}
