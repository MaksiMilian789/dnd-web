import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';
import { ConditionsListComponent } from './conditions/components/conditions-list/conditions-list.component';
import { CreateConditionDialogComponent } from './conditions/components/create-condition-dialog/create-condition-dialog.component';
import { SelectSkillsComponent } from './skills/components/select-skills/select-skills.component';
import { SkillsListComponent } from './skills/components/skills-list/skills-list.component';
import { CreateSkillDialogComponent } from './skills/components/create-skill-dialog/create-skill-dialog.component';

@NgModule({
  declarations: [
    WorkshopShellComponent,
    WorkshopHomeComponent,
    ConditionsListComponent,
    CreateConditionDialogComponent,    
    SelectSkillsComponent,    
    SkillsListComponent,
    CreateSkillDialogComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class WorkshopModule {}
