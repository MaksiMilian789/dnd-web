import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { SharedModule } from './shared';
import { AppShellComponent } from './app-shell/app-shell/app-shell.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, AppShellComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
