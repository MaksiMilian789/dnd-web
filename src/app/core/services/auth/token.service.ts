import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE } from '@ng-web-apis/common';

const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    @Inject(SESSION_STORAGE) private readonly sessionStorage: Storage
  ) {}

  setTokens(
    accessToken: string,
    rememberMe: boolean = true
  ): void {
    const storage = rememberMe ? this.localStorage : this.sessionStorage;

    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  getAccessToken(): string | null {
    return this.getToken(ACCESS_TOKEN_KEY);
  }

  isRememberMe(): boolean | null {
    if (this.localStorage.getItem(ACCESS_TOKEN_KEY)) {
      return true;
    } else if (this.sessionStorage.getItem(ACCESS_TOKEN_KEY)) {
      return false;
    } else {
      return null;
    }
  }

  clear(): void {
    this.localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  private getToken(key: string): string | null {
    return this.localStorage.getItem(key) ?? this.sessionStorage.getItem(key);
  }
}