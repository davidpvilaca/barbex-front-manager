import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as decode from 'jwt-decode';

import { environment } from '@environments';
import { IUserClaims, ISignupBody, IUser } from '@core/interfaces';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;
  private sessionKey = '_SESSION_';

  constructor(private readonly http: HttpClient, private readonly storage: StorageService) { }

  get userToken(): string | null {
    const { token } = this.userClaims || { token: null };
    return token;
  }

  get currentUser() {
    const { user } = this.userClaims || { user: null };
    return user;
  }

  private get userClaims(): IUserClaims | null {
    return this.storage.get(this.sessionKey);
  }

  private set userClaims(user: IUserClaims) {
    this.storage.set(this.sessionKey, user);
  }

  isAuthenticated(): boolean {
    const { token } = this.userClaims || { token: undefined };
    if (token) {
      const now = Date.now() / 1000;
      return (decode(token) as any).exp >= now;
    }
    return false;
  }

  login(email: string, password: string) {
    return this.http.post<IUserClaims>(`${this.url}/sessions`, { email, password }).pipe(
      tap(user => this.userClaims = user)
    );
  }

  logout(): void {
    this.userClaims = null;
  }

  signup(user: ISignupBody) {
    return this.http.post<IUser>(`${this.url}/users`, user);
  }

}
