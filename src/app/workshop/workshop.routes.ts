import { Routes } from '@angular/router';

import { authGuard } from '../auth/auth.guard';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';
import { ConditionsListComponent } from './conditions/components/conditions-list/conditions-list.component';
import { SkillsListComponent } from './skills/components/skills-list/skills-list.component';
import { InventoryListComponent } from './inventory/components/inventory-list/inventory-list.component';
import { SpellsListComponent } from './spells/components/spells-list/spells-list.component';
import { ClassListComponent } from './player-classes/components/class-list/class-list.component';
import { RaceListComponent } from './races/components/race-list/race-list.component';
import { BackgroundsListComponent } from './backgrounds/components/backgrounds-list/backgrounds-list.component';

export const WORKSHOP_ROUTES: Routes = [
  {
    path: 'workshop',
    component: WorkshopShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: WorkshopHomeComponent,
      },
      {
        path: 'skills',
        component: SkillsListComponent,
      },
      {
        path: 'inventoryObjects',
        component: InventoryListComponent,
      },
      {
        path: 'spells',
        component: SpellsListComponent,
      },
      {
        path: 'classes',
        component: ClassListComponent,
      },
      {
        path: 'races',
        component: RaceListComponent,
      },
      {
        path: 'backgrounds',
        component: BackgroundsListComponent,
      },
      {
        path: 'conditions',
        component: ConditionsListComponent,
      },
    ],
  },
];
