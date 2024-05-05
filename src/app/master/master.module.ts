import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AccessPlayersComponent } from './access/components/access-players/access-players.component';
import { MasterHomeComponent } from './components/master-home/master-home.component';
import { MasterShellComponent } from './components/master-shell/master-shell.component';
import { InitiativeTrackerComponent } from './world/tracker/components/initiative-tracker/initiative-tracker.component';
import { CreateWorldDialogComponent } from './world/components/create-world-dialog/create-world-dialog.component';
import { CreateTrackerUnitDialogComponent } from './world/tracker/components/create-tracker-unit-dialog/create-tracker-unit-dialog.component';
import { CreateWikiDialogComponent } from './world/wiki/components/create-wiki-dialog/create-wiki-dialog.component';

@NgModule({
  declarations: [
    InitiativeTrackerComponent,
    MasterShellComponent,
    MasterHomeComponent,
    AccessPlayersComponent,
    CreateTrackerUnitDialogComponent,
    CreateWorldDialogComponent,
    CreateWikiDialogComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class MasterModule {}
