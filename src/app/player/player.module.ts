import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { CharacterMainComponent } from './character/components/character-main/character-main.component';
import { CharactersComponent } from './character/components/characters/characters.component';
import { AddItemDialogComponent } from './character/inventory/components/add-item-dialog/add-item-dialog.component';
import { CharacterInventoryComponent } from './character/inventory/components/character-inventory/character-inventory.component';
import { AddSkillDialogComponent } from './character/skills/components/add-skill-dialog/add-skill-dialog.component';
import { CharacterSkillsComponent } from './character/skills/components/character-skills/character-skills.component';
import { AddSpellDialogComponent } from './character/spells/components/add-spell-dialog/add-spell-dialog.component';
import { CharacterSpellsComponent } from './character/spells/components/character-spells/character-spells.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { PlayerShellComponent } from './components/player-shell/player-shell.component';
import { CreateCharacterComponent } from './character/components/create-character/create-character.component';
import { CharacteristicsDialogComponent } from './character/components/characteristics-dialog/characteristics-dialog.component';
import { CharInfoDialogComponent } from './character/components/char-info-dialog/char-info-dialog.component';
import { CharacterBattleComponent } from './character/components/character-battle/character-battle.component';
import { AddConditionDialogComponent } from './character/conditions/components/add-condition-dialog/add-condition-dialog.component';
import { NoteComponent } from './character/notes/components/note/note.component';
import { NotesHomeComponent } from './character/notes/components/notes-home/notes-home.component';
import { NotesShellComponent } from './character/notes/components/notes-shell/notes-shell.component';

@NgModule({
  declarations: [
    PlayerShellComponent,
    PlayerHomeComponent,
    CharactersComponent,
    CharacterMainComponent,
    CharacterInventoryComponent,
    AddItemDialogComponent,
    CharacterSkillsComponent,
    AddSkillDialogComponent,
    CharacterSpellsComponent,
    AddSpellDialogComponent,
    CreateCharacterComponent,
    CharacteristicsDialogComponent,    
    CharInfoDialogComponent,    
    CharacterBattleComponent,
    AddConditionDialogComponent,
    NoteComponent,
    NotesHomeComponent,
    NotesShellComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class PlayerModule {}
