import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AccessPlayersComponent } from './access/components/access-players/access-players.component';
import { MasterHomeComponent } from './components/master-home/master-home.component';
import { MasterShellComponent } from './components/master-shell/master-shell.component';
import { AddTrackerDialogComponent } from './world/tracker/components/add-tracker-dialog/add-tracker-dialog.component';
import { InitiativeTrackerComponent } from './world/tracker/components/initiative-tracker/initiative-tracker.component';

@NgModule({
  declarations: [
    InitiativeTrackerComponent,
    MasterShellComponent,
    MasterHomeComponent,
    AccessPlayersComponent,
    AddTrackerDialogComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class MasterModule {}
