import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from './shared';
import { PlayerShellComponent } from './player/player-shell/player-shell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { CharactersComponent } from './player/characters/characters.component';
import { InitiativeTrackerComponent } from './master/initiative-tracker/initiative-tracker.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterMainComponent } from './player/character/character-main/character-main.component';
import { CharacterInventoryComponent } from './player/character/character-inventory/character-inventory.component';
import { MasterShellComponent } from './master/master-shell/master-shell.component';
import { MasterHomeComponent } from './master/master-home/master-home.component';
import { AccessPlayersComponent } from './master/access-players/access-players.component';
import { AddTrackerDialogComponent } from './master/initiative-tracker/add-tracker-dialog/add-tracker-dialog.component';
import { ColorPipe } from './shared/pipes/color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PlayerShellComponent,
    HomeComponent,
    PlayerHomeComponent,
    CharactersComponent,
    InitiativeTrackerComponent,
    CharacterMainComponent,
    CharacterInventoryComponent,
    MasterShellComponent,
    MasterHomeComponent,
    AccessPlayersComponent,
    AddTrackerDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
