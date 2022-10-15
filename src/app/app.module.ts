import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { httpService, SharedModule } from './shared';
import { AppShellComponent } from './app-shell/app-shell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { MyResultsComponent } from './my-results/my-results.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, AppShellComponent, TestComponent, HomeComponent, MyResultsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
