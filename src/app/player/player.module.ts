import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AddCharacter1NameComponent } from './character/components/add-character/add-character1-name/add-character1-name.component';
import { AddCharacter2ClassComponent } from './character/components/add-character/add-character2-class/add-character2-class.component';
import { AddCharacter3RaceComponent } from './character/components/add-character/add-character3-race/add-character3-race.component';
import { AddCharacter4BackgroundComponent } from './character/components/add-character/add-character4-background/add-character4-background.component';
import { CharacterInfoDialogComponent } from './character/components/character-info-dialog/character-info-dialog.component';
import { AddConditionDialogComponent } from './character/components/character-main/add-condition-dialog/add-condition-dialog.component';
import { CharacterMainComponent } from './character/components/character-main/character-main.component';
import { EditPriorityItemComponent } from './character/components/character-main/edit-priority-item/edit-priority-item.component';
import { CharactersComponent } from './character/components/characters/characters.component';
import { AddItemDialogComponent } from './character/inventory/components/add-item-dialog/add-item-dialog.component';
import { CharacterInventoryComponent } from './character/inventory/components/character-inventory/character-inventory.component';
import { AddSkillDialogComponent } from './character/skills/components/add-skill-dialog/add-skill-dialog.component';
import { CharacterSkillsComponent } from './character/skills/components/character-skills/character-skills.component';
import { AddSpellDialogComponent } from './character/spells/components/add-spell-dialog/add-spell-dialog.component';
import { CharacterSpellsComponent } from './character/spells/components/character-spells/character-spells.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { PlayerShellComponent } from './components/player-shell/player-shell.component';

@NgModule({
  declarations: [
    PlayerShellComponent,
    PlayerHomeComponent,
    CharactersComponent,
    CharacterMainComponent,
    CharacterInventoryComponent,
    AddCharacter1NameComponent,
    AddCharacter2ClassComponent,
    AddCharacter3RaceComponent,
    AddCharacter4BackgroundComponent,
    AddItemDialogComponent,
    CharacterSkillsComponent,
    AddSkillDialogComponent,
    CharacterSpellsComponent,
    AddSpellDialogComponent,
    CharacterInfoDialogComponent,
    AddConditionDialogComponent,
    EditPriorityItemComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class PlayerModule {}
