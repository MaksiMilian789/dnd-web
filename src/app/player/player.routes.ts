import { Routes } from '@angular/router';

import { authGuard } from '../auth/auth.guard';
import { WorldComponent } from '@shared/components/world/world.component';
import { WorldsComponent } from '@shared/components/worlds/worlds.component';
import { CharacterMainComponent } from './character/components/character-main/character-main.component';
import { CharactersComponent } from './character/components/characters/characters.component';
import { CharacterInventoryComponent } from './character/inventory/components/character-inventory/character-inventory.component';
import { CharacterSkillsComponent } from './character/skills/components/character-skills/character-skills.component';
import { CharacterSpellsComponent } from './character/spells/components/character-spells/character-spells.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { PlayerShellComponent } from './components/player-shell/player-shell.component';
import { CreateCharacterComponent } from './character/components/create-character/create-character.component';
import { CharacterBattleComponent } from './character/components/character-battle/character-battle.component';
import { NoteComponent } from './character/notes/components/note/note.component';
import { WikiComponent } from '@shared/components/wiki/wiki.component';

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
        path: 'createCharacter',
        component: CreateCharacterComponent,
      },
      {
        path: 'character/:characterId',
        component: CharacterMainComponent,
      },
      {
        path: 'character/:characterId/battle',
        component: CharacterBattleComponent,
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
        path: 'character/:characterId/notes',
        component: NoteComponent,
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
        path: 'world/:worldId/wiki',
        component: WikiComponent,
      },
    ],
  },
];
