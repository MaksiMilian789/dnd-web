import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';

@Component({
  selector: 'app-create-wiki-dialog',
  templateUrl: './create-wiki-dialog.component.html',
  styleUrl: './create-wiki-dialog.component.scss',
})
export class CreateWikiDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<string | null>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _route: ActivatedRoute,
    private _worldService: WorldService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  create(): void {
    setTimeout(() => {
      this.context.completeWith(this.form.controls['name'].value);
    }, 300);
  }

  close(): void {
    this.context.completeWith(null);
  }
}
