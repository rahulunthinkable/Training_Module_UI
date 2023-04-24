import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { InternalRoutes } from 'src/app/utils/internal-routes';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
  constructor(
    @Inject(LocalStorageToken) private localstorage : Storage,
    private router : Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.localstorage.getItem('token')) {
        this.router.navigateByUrl(InternalRoutes.HOME);
        return false;
      }
    return true;
  }
}
