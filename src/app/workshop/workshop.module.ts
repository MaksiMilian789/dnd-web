import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';
import { ConditionsListComponent } from './conditions/components/conditions-list/conditions-list.component';
import { CreateConditionDialogComponent } from './conditions/components/create-condition-dialog/create-condition-dialog.component';
import { SelectSkillsComponent } from './skills/components/select-skills/select-skills.component';

@NgModule({
  declarations: [
    WorkshopShellComponent,
    WorkshopHomeComponent,
    ConditionsListComponent,
    CreateConditionDialogComponent,    
    SelectSkillsComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class WorkshopModule {}
