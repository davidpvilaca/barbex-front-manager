import { Injectable } from '@angular/core';

import { environment } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageKey = '_BARBEX_';

  get<T>(key: string): T {
    return this.storage[key] || null;
  }

  set(key: string, value: any): void {
    const storage = this.storage;
    storage[key] = value;
    this.save(storage);
  }

  remove(key: string): void {
    const storage = this.storage;
    delete storage[key];
    this.save(storage);
  }

  private get storage(): { [key: string]: any } {
    try {
      const storage = JSON.parse(localStorage.getItem(this.localStorageKey));
      return storage === null ? {} : storage;
    } catch (e) {
      return {};
    }
  }

  private save(storage: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(storage));
  }

}
