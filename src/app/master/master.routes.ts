import { Routes } from '@angular/router';

import { authGuard } from '../auth/auth.guard';
import { WorldComponent } from '@shared/components/world/world.component';
import { WorldsComponent } from '@shared/components/worlds/worlds.component';
import { AccessPlayersComponent } from './access/components/access-players/access-players.component';
import { MasterHomeComponent } from './components/master-home/master-home.component';
import { MasterShellComponent } from './components/master-shell/master-shell.component';
import { InitiativeTrackerComponent } from './world/tracker/components/initiative-tracker/initiative-tracker.component';

export const MASTER_ROUTES: Routes = [
    {
        path: 'master',
        component: MasterShellComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: MasterHomeComponent,
          },
          {
            path: 'access-players',
            component: AccessPlayersComponent,
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
            path: 'world/:worldId/tracker',
            component: InitiativeTrackerComponent,
          },
        ],
      },
    ]
