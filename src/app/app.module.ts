import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';

import { CoreModule } from '@core/core.module';
import { GlobalErrorHandler } from '@core/error-handler';
import { AuthInterceptor } from '@core/services/auth/auth.interceptor';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { PlayerModule } from './player/player.module';
import { MasterModule } from './master/master.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    HomeComponent,
  ],
  imports: [
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,

    AppRoutingModule,
    SharedModule,
    PlayerModule,
    MasterModule,

    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
