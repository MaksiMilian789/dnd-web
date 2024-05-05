import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { TrackerUnit } from '@core/models';
import { COLORS_LOCALIZATION, Colors, ICONS_LOCALIZATION, Icons } from '@core/enums';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-create-tracker-unit-dialog',
  templateUrl: './create-tracker-unit-dialog.component.html',
  styleUrl: './create-tracker-unit-dialog.component.scss',
})
export class CreateTrackerUnitDialogComponent {
  form: FormGroup;
  colors = COLORS_LOCALIZATION;
  icons = ICONS_LOCALIZATION;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean | TrackerUnit>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      initiative: new FormControl('', Validators.required),
      color: new FormControl(0, Validators.required),
      icon: new FormControl(0, Validators.required),
    });
  }

  create() {
    let newUnit: TrackerUnit = {
      name: this.form.value.name,
      initiative: this.form.value.initiative,
      color: Colors[this.form.value.color],
      icon: Icons[this.form.value.icon],
    };
    this.context.completeWith(newUnit);
  }

  close(): void {
    this.context.completeWith(false);
  }

  getIcon(): string {
    return Icons[this.form.controls['icon'].value];
  }

  @tuiPure
  protected stringifyColor(): TuiStringHandler<Colors> {
    return (value: Colors) => COLORS_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyIcon(): TuiStringHandler<Icons> {
    return (value: Icons) => ICONS_LOCALIZATION[value] || '';
  }

  stopSort() {
    return 0;
  }
}
