import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Subscription, finalize } from 'rxjs';

import { RegistrationService } from '../core/services/api/registration.service';
import { PwaService } from '../shared/services/pwa-service.service';
import { AuthService } from '../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface AuthForm {
  username: FormControl<string>;
  password: FormControl<string>;  
  rememberMe: FormControl<boolean>;
}

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [],
})
export class AuthComponent {
  protected readonly form: FormGroup<AuthForm>;

  protected isAuthInProcess = false;
  protected error: string | null = null;

  private _returnUrl: string | null;
  constructor(
    protected pwa: PwaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup<AuthForm>({
      username: new FormControl('', { nonNullable: true, validators: Validators.required }),
      password: new FormControl('', { nonNullable: true, validators: Validators.required }),
      rememberMe: new FormControl(true, { nonNullable: true }),
    });

    /*this.checkRegistration = this._registration.registrationMessage.subscribe(
      (val) => {
        if (val) this._snackbar.open('Регистрация успешна');
      }
    );*/

    this._returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formState = this.form.value;

    this.form.disable();
    this.isAuthInProcess = true;
    this.authService
      .auth(formState.username!, formState.password!, formState.rememberMe!)
      .pipe(
        finalize(() => {
          this.form.enable();
          this.isAuthInProcess = false;
        })
      )
      .subscribe(() =>
        this.router.navigateByUrl(this._returnUrl ?? '/')
      );
  }
}
