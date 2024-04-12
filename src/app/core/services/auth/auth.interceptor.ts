import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import {
    Observable,
    catchError,
    throwError,
  } from 'rxjs';
  
import { TokenService } from './token.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
  
    constructor(
      private readonly tokenService: TokenService,
    ) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const accessToken = this.tokenService.getAccessToken();
      if (!!accessToken) {
        req = this.withAuthHeader(req, accessToken);
  
        return next.handle(req).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        );
      } else {
        return next.handle(req);
      }
    }

    private withAuthHeader(
      req: HttpRequest<any>,
      accessToken: string
    ): HttpRequest<any> {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }
  