import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfig } from './config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: AppConfig | null = null;

  constructor(private http: HttpClient) {
  }

  get config(): AppConfig {    
    if (this._config == null) {
      throw new Error('Configuration not loaded.');
    }
    return this._config;
  }

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('/assets/config.json').pipe(tap((config) => (this._config = config)));
  }
}
