import { Routes } from '@angular/router';

import { authGuard } from '../auth/auth.guard';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';
import { ConditionsListComponent } from './conditions/components/conditions-list/conditions-list.component';

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
        path: 'conditions',
        component: ConditionsListComponent,
      },
    ],
  },
];
