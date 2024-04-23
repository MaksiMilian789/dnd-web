import { Routes } from '@angular/router';

import { authGuard } from '../auth/auth.guard';
import { WorldComponent } from '@shared/components/world/world.component';
import { WorldsComponent } from '@shared/components/worlds/worlds.component';
import { AddCharacter1NameComponent } from './character/components/add-character/add-character1-name/add-character1-name.component';
import { AddCharacter2ClassComponent } from './character/components/add-character/add-character2-class/add-character2-class.component';
import { AddCharacter3RaceComponent } from './character/components/add-character/add-character3-race/add-character3-race.component';
import { AddCharacter4BackgroundComponent } from './character/components/add-character/add-character4-background/add-character4-background.component';
import { CharacterMainComponent } from './character/components/character-main/character-main.component';
import { CharactersComponent } from './character/components/characters/characters.component';
import { CharacterInventoryComponent } from './character/inventory/components/character-inventory/character-inventory.component';
import { CharacterSkillsComponent } from './character/skills/components/character-skills/character-skills.component';
import { CharacterSpellsComponent } from './character/spells/components/character-spells/character-spells.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { PlayerShellComponent } from './components/player-shell/player-shell.component';

export const PLAYER_ROUTES: Routes = [
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
];
