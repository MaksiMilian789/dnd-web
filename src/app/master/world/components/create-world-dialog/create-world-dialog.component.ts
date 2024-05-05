import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';

@Component({
  selector: 'app-create-world-dialog',
  templateUrl: './create-world-dialog.component.html',
  styleUrl: './create-world-dialog.component.scss',
})
export class CreateWorldDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _worldService: WorldService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  create(): void {
    this._worldService
      .createWorld(
        this._authService.currentUser?.id!,
        this.form.controls['name'].value,
        this.form.controls['description'].value,
      )
      .subscribe(() => {
        this._snackbar.open('Создание мира успешно.');
        this.context.completeWith(true);
      });
  }

  close(): void {
    this.context.completeWith(false);
  }
}
