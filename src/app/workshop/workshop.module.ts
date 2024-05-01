import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';
import { ConditionsListComponent } from './conditions/components/conditions-list/conditions-list.component';
import { CreateConditionDialogComponent } from './conditions/components/create-condition-dialog/create-condition-dialog.component';
import { SelectSkillsComponent } from './skills/components/select-skills/select-skills.component';
import { SkillsListComponent } from './skills/components/skills-list/skills-list.component';
import { CreateSkillDialogComponent } from './skills/components/create-skill-dialog/create-skill-dialog.component';
import { BackgroundsListComponent } from './backgrounds/components/backgrounds-list/backgrounds-list.component';
import { InventoryListComponent } from './inventory/components/inventory-list/inventory-list.component';
import { ClassListComponent } from './player-classes/components/class-list/class-list.component';
import { RaceListComponent } from './races/components/race-list/race-list.component';
import { SpellsListComponent } from './spells/components/spells-list/spells-list.component';

@NgModule({
  declarations: [
    WorkshopShellComponent,
    WorkshopHomeComponent,
    ConditionsListComponent,
    CreateConditionDialogComponent,    
    SelectSkillsComponent,    
    SkillsListComponent,
    CreateSkillDialogComponent,    
    BackgroundsListComponent,
    InventoryListComponent,
    ClassListComponent,
    RaceListComponent,
    SpellsListComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class WorkshopModule {}
