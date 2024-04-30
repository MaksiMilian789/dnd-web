import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './auth/auth.guard';
import { MASTER_ROUTES } from './master/master.routes';
import { PLAYER_ROUTES } from './player/player.routes';
import { WORKSHOP_ROUTES } from './workshop/workshop.routes';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  ...PLAYER_ROUTES,
  ...MASTER_ROUTES,
  ...WORKSHOP_ROUTES,
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
