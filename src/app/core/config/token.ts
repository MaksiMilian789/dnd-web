import { inject, InjectionToken } from '@angular/core';
import { ConfigService } from './config.service';

export const APP_CONFIG = new InjectionToken('Application configuration loaded at startup from backend.', {
  factory: () => inject(ConfigService).config,
});
