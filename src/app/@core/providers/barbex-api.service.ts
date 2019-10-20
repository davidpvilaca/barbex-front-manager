import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as decode from 'jwt-decode';

import { environment } from '@environments';
import { IUserClaims, ISignupBody, IUser } from '@core/interfaces';

import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BarbexApiService {

  private url = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly storage: StorageService, private auth: AuthService) { }
  
  registerBarbershop(data: any) {
    const headers =  new HttpHeaders({
      'Authorization': `Bearer ${this.auth.userToken}`
    });
    return this.http.post<any>(`${this.url}/barbershops`, data, { headers });
  }
  
  registerAddress(data: any) {
    const headers =  new HttpHeaders({
      'Authorization': `Bearer ${this.auth.userToken}`
    });
    return this.http.post<any>(`${this.url}/addresses`, data, { headers });
  }

}
