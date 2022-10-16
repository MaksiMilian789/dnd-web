import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerShellComponent } from './player/player-shell/playe-shell.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { WorldsComponent } from './shared/components/worlds/worlds.component';
import { CharactersComponent } from './player/characters/characters.component';
import { InitiativeTrackerComponent } from './master/initiative-tracker/initiative-tracker.component';
import { CharacterMainComponent } from './player/character/character-main/character-main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'player',
    component: PlayerShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PlayerHomeComponent,
      },
      {
        path: 'characters',
        component: CharactersComponent,
      },
      {
        path: 'character/:characterId',
        component: CharacterMainComponent,
      },
      {
        path: 'worlds',
        component: WorldsComponent,
      },
    ],
  },
  {
    path: 'master',
    component: InitiativeTrackerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
