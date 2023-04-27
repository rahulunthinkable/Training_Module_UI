import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { InternalRoutes } from 'src/app/utils/internal-routes';
import { Storage_variables } from 'src/app/utils/local-storage-variable';

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
      if(this.localstorage.getItem(Storage_variables.token)) {
        let prev_route:any = this.localstorage.getItem(Storage_variables.last_route);
        this.router.navigateByUrl(prev_route)
        return false;
      }
    return true;
  }
}
