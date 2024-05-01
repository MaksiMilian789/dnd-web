import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

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
    })
  );
};
