import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  readonly isLoading: Observable<boolean>;
  private readonly bs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private number = 0;
  constructor() {
    this.isLoading = this.bs.asObservable();
  }

  setLoading(): void {
    this.number += 1;
    this.bs.next(true);
  }

  clearLoading(): void {
    if (--this.number < 1) {
      this.bs.next(false);
    }
  }
}
