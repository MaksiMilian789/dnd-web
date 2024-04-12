import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { TokenService } from './token.service';
import { OAuthTokenResponse, UserJwt } from '@core/models/auth';
import { APP_CONFIG, AppConfig } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser$: Observable<UserJwt | null>;

  readonly isAuthenticated$: Observable<boolean>;

  readonly logout$ = new EventEmitter<void>();

  private readonly _baseUrl: string;

  private readonly _currentUser$ = new BehaviorSubject<UserJwt | null>(null);

  get currentUser(): UserJwt | null {
    console.log(this._currentUser$.getValue())
    return this._currentUser$.getValue();
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api}/api`;

    this.currentUser$ = this._currentUser$.asObservable();

    this.isAuthenticated$ = this.currentUser$.pipe(map((user) => user != null));

    const accessToken = this.tokenService.getAccessToken();
    if (!!accessToken) {
      this._currentUser$.next(new UserJwt(accessToken));
    }
  }

  auth(login: string, password: string, rememberMe: boolean): Observable<OAuthTokenResponse> {
    const form = new FormData();
    form.set('grant_type', 'password');
    form.set('login', login);
    form.set('password', password);

    return this.callAuth(form, rememberMe);
  }

  logout(): void {
    this.tokenService.clear();
    this._currentUser$.next(null);
    this.logout$.next();
    this.router.navigate(['/auth']);
  }

  private callAuth(request: FormData, rememberMe: boolean): Observable<OAuthTokenResponse> {
    return this.http.post<OAuthTokenResponse>(`${this._baseUrl}/auth`, request).pipe(
      tap((response) => {
        this.tokenService.setTokens(response.accessToken, rememberMe);
        this._currentUser$.next(new UserJwt(response.accessToken));
      }),
    );
  }
}
