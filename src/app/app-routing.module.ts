import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerShellComponent } from './player/player-shell/player-shell.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { WorldsComponent } from './shared/components/worlds/worlds.component';
import { CharactersComponent } from './player/characters/characters.component';
import { InitiativeTrackerComponent } from './master/initiative-tracker/initiative-tracker.component';
import { CharacterMainComponent } from './player/character/character-main/character-main.component';
import { MasterShellComponent } from './master/master-shell/master-shell.component';
import { MasterHomeComponent } from './master/master-home/master-home.component';
import { AccessPlayersComponent } from './master/access-players/access-players.component';
import { AddCharacter1NameComponent } from './player/add-character/add-character1-name/add-character1-name.component';
import { AddCharacter2ClassComponent } from './player/add-character/add-character2-class/add-character2-class.component';
import { AddCharacter3RaceComponent } from './player/add-character/add-character3-race/add-character3-race.component';
import { AddCharacter4BackgroundComponent } from './player/add-character/add-character4-background/add-character4-background.component';
import { RegistrationComponent } from './registration/registration.component';
import { WorldComponent } from './shared/components/world/world.component';
import { CharacterInventoryComponent } from './player/character/character-inventory/character-inventory.component';
import { CharacterSkillsComponent } from './player/character/character-skills/character-skills.component';
import { CharacterSpellsComponent } from './player/character/character-spells/character-spells.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'player',
    component: PlayerShellComponent,
    canActivate: [authGuard],
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
        path: 'createCharacterName',
        component: AddCharacter1NameComponent,
      },
      {
        path: 'createCharacterClass',
        component: AddCharacter2ClassComponent,
      },
      {
        path: 'createCharacterRace',
        component: AddCharacter3RaceComponent,
      },
      {
        path: 'createCharacterBackground',
        component: AddCharacter4BackgroundComponent,
      },
      {
        path: 'character/:characterId',
        component: CharacterMainComponent,
      },
      {
        path: 'character/:characterId/inventory',
        component: CharacterInventoryComponent,
      },
      {
        path: 'character/:characterId/skills',
        component: CharacterSkillsComponent,
      },
      {
        path: 'character/:characterId/spells',
        component: CharacterSpellsComponent,
      },
      {
        path: 'worlds',
        component: WorldsComponent,
      },
      {
        path: 'world/:worldId',
        component: WorldComponent,
      },
    ],
  },
  {
    path: 'master',
    component: MasterShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MasterHomeComponent,
      },
      {
        path: 'access-players',
        component: AccessPlayersComponent,
      },
      {
        path: 'worlds',
        component: WorldsComponent,
      },
      {
        path: 'world/:worldId',
        component: WorldComponent,
      },
      {
        path: 'world/:worldId/tracker',
        component: InitiativeTrackerComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
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
