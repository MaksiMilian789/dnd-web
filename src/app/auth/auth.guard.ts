import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { ErrorDialogComponent, ErrorDialogData } from '@core/error-handler/error-dialog.component';
import { AuthService } from '../core/services/auth/auth.service';

export const authGuard: CanActivateFn = (state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const dialogs = inject(TuiDialogService);
  const ngZone = inject(NgZone);

  if (authService.currentUser?.expired && new Date() > new Date(authService.currentUser?.expired! * 1000)) {   
    ngZone.run(() => {
      let message = 'Истёк срок действия токена';
      let details = '';
      dialogs
        .open(new PolymorpheusComponent(ErrorDialogComponent), {
          label: 'Произошла ошибка',
          size: 'auto',
          data: { message, details } as ErrorDialogData,
        })
        .subscribe();
    });
    return router.createUrlTree(['/auth'], {
      queryParams: {
        returnUrl: state.url,
      },
    });
  }

  return authService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/auth'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
      }
    }),
  );
};
