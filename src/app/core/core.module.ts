import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { firstValueFrom } from 'rxjs';

// Localization
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

import { ContentLanguageInterceptor } from './content-language.interceptor';
import { ConfigService } from './config';

// Register locales
registerLocaleData(localeRu, 'ru', localeRuExtra);

// Load application config at startup
export function loadConfigFactory(configService: ConfigService): () => Promise<any> {
  return () => firstValueFrom(configService.loadConfig());
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigFactory,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentLanguageInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
