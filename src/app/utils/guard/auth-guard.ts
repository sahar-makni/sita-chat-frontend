import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PATHS} from '../const/paths';
import {WEB_LOCAL_STORAGE} from '../providers/web-storage.provider';
import {ACCESS_TOKEN} from '../const/general';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router,
              @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.localStorage.getItem(ACCESS_TOKEN)) {
      this.router.navigate([PATHS.SIGN_IN.VALUE]).then();
      return false;
    }
    return true;
  }
}
