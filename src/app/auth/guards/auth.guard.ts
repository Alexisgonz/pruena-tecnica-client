import { Injectable } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    return this.handleAuthentication();
  }

  handleAuthentication() {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return isAuthenticated;
  }
}
