import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../login-credentials';
import { map } from 'rxjs';
import { TokenService } from './token.service';
import { AuthResponse } from '../auth-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = environment.api;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credencials: LoginCredentials) {
    const url = `${this.apiUrl}/auth/login`;
    const { username, password } = credencials;
    return this.http.post<AuthResponse>(url, { username, password }).pipe(
      map(({ accessToken }) => {
        if (accessToken) {
          this.tokenService.setToken(accessToken);
        }
        return accessToken;
      })
    );
  }

  isAuthenticated() {
    return this.tokenService.isValid() && !this.tokenService.isExpired();
  }
}
