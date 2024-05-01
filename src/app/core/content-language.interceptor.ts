import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentLanguageInterceptor implements HttpInterceptor {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.locale == null) {
      return next.handle(req);
    }

    const newReq = req.clone({ setHeaders: { 'Content-Language': this.locale } });
    return next.handle(newReq);
  }
}
