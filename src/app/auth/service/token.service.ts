import { Injectable } from '@angular/core';
import { UserToken } from '../user-token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private decodedToken: BehaviorSubject<UserToken | null>;
  decodedToken$: Observable<UserToken | null>;
  tokenStorage = 'token_innovagest';
  serial = 'serial';

  constructor() {
    this.decodedToken = new BehaviorSubject<UserToken | null>(
      this.getDecodedToken()
    );
    this.decodedToken$ = this.decodedToken.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenStorage, token);
    const decodedToken = this.getDecodedToken();
    this.decodedToken.next(decodedToken);
  }

  getToken() {
    return localStorage.getItem(this.tokenStorage);
  }

  getDecodedToken(): UserToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('JWT must have 3 parts');
      return null;
    }

    const decoded = JSON.parse(window.atob(parts[1]));
    return decoded;
  }
}
