import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
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
import { CreateCharacterComponent } from './character/components/create-character/create-character.component';
import { CharacteristicsDialogComponent } from './character/components/characteristics-dialog/characteristics-dialog.component';

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
    CharacterInfoDialogComponent,
    AddConditionDialogComponent,
    EditPriorityItemComponent,
    CreateCharacterComponent,
    CharacteristicsDialogComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class PlayerModule {}
