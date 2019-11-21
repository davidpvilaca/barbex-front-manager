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
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly auth: AuthService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  protected isAuthenticated() {
    const isAuthenticated = this.auth.isAuthenticated();
    const path = location.pathname;
    const queryParams = path !== '/app' && path !== '/' ? {
      redirectTo: location.pathname
    } : {};
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login'], { queryParams });
    }
    return isAuthenticated;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }
}
