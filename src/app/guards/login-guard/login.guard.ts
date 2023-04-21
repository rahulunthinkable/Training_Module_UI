import { Inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageToken } from "../../localstorage.token";
import { InternalRoutes } from "../../utils/internal-routes";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localstorage.getItem("token")) {
      return true;
    }
    this.router.navigateByUrl(InternalRoutes.LOGIN_PAGE);
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localstorage.getItem("token")) {
      return true;
    }
    return false;
  }
}
