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

  registerBarber(barbershopId: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.post<any>(`${this.url}/barbershops/${barbershopId}/barbers`, data, { headers });
  }

  registerBarbershop(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.post<any>(`${this.url}/barbershops`, data, { headers });
  }

  registerAddress(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.post<any>(`${this.url}/addresses`, data, { headers });
  }

  getBarbershop(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.get<any>(`${this.url}/barbershops/${id}`, { headers });
  }

  getBarbershops() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.get<any>(`${this.url}/barbershops`, { headers });
  }

  getBarbers(barbershopId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.userToken}`
    });
    return this.http.get<any>(`${this.url}/barbershops/${barbershopId}/barbers`, { headers });
  }

}
