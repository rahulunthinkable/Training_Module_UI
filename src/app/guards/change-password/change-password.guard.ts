import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { Storage_variables } from 'src/app/utils/local-storage-variable';
import { InternalRoutes } from 'src/app/utils/internal-routes';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuard implements CanActivate {

  constructor(
    @Inject(LocalStorageToken) private localstorage : Storage,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.localstorage.getItem(Storage_variables._id)) {
        return true;
      }
      this.router.navigateByUrl(InternalRoutes.LOGIN_PAGE);
    return false;
  }
  
}
