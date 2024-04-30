import { Component, Inject, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { System } from '@core/enums';
import { ConditionCreate, World } from '@core/models';
import { WorkshopService } from '@core/services/api/workshop.service';
import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-condition-dialog',
  templateUrl: './create-condition-dialog.component.html',
  styleUrl: './create-condition-dialog.component.scss',
})
export class CreateConditionDialogComponent {
  form: FormGroup;

  // TODO: Состояниям можно добавлять только passive скиллы
  skillIds: number[] = [];

  worlds: Signal<World[]>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean>,
    private _workshopService: WorkshopService,
    private _worldService: WorldService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      worldId: new FormControl<number | null>(null),
    });

    this.worlds = toSignal(this._worldService.loadShortWorlds(this._authService.currentUser?.id!), {
      initialValue: [],
    });
  }

  create(): void {
    const dto: ConditionCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
      worldId: this.form.controls['worldId'].value ?? null,
      skillIds: this.skillIds,
    };
    this._workshopService.createCondition(dto).subscribe(() => {
      this._snackbar.open('Создание успешно.');
      this.context.completeWith(true);
    });
  }

  close(): void {
    this.context.completeWith(false);
  }

  @tuiPure
  protected stringifyWorld(): TuiStringHandler<number> {
    return (value: number) => this.worlds().find((x) => x.id == value)?.name || '';
  }
}
