import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/providers';

@Injectable({
  providedIn: 'root'
})
export class IsUnauthenticatedGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly auth: AuthService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  protected isUnauthenticated() {
    const isUnauthenticated = !this.auth.isAuthenticated();
    if (!isUnauthenticated) {
      this.router.navigate(['/app']);
    }
    return isUnauthenticated;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUnauthenticated();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUnauthenticated();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isUnauthenticated();
  }
}
