import { Inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageToken } from "src/app/localstorage.token";
import { UserDetailService } from "src/app/service/User-detail-service/user-detail.service";
import { SnackService } from "src/app/service/snack-bar/snack.service";
import { UserDetails } from "src/app/shared/components/user-profile/view-profile/user.model";
import { ErrorMessages } from "src/app/utils/error-messages";
import { Storage_variables } from "src/app/utils/local-storage-variable";
import { SnackClasses } from "src/app/utils/snack-bar-classes";
import { roles } from "src/app/utils/util-constant";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  userDetails!: UserDetails;
  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private userDetailsService: UserDetailService,
    private router: Router,
    private snakBarService: SnackService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userDetails = this.userDetailsService.getUserDetails();
    if (this.userDetails.role == roles.ADMIN) {
      return true;
    } else {
      let prev_route: any = this.localStorage.getItem(
        Storage_variables.last_route
      );
      this.snakBarService.openSnackBar(
        ErrorMessages.SOMETHING_WENT_WRONG,
        1000,
        SnackClasses.ERROR
      );
      this.router.navigateByUrl(prev_route);
      return false;
    }
  }
}
