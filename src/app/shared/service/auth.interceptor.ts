import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { TokenService } from "../../auth/service/token.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'authorization';

  constructor(private tokenService: TokenService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token) {
      request = request.clone({
        headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + token),
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
