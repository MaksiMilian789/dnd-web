import { Component, Inject, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { System } from '@core/enums';
import { ClassCreate, ConditionCreate, Skill, World } from '@core/models';
import { WorkshopService } from '@core/services/api/workshop.service';
import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  SelectSkillsComponent,
  SelectSkillsComponentData,
} from 'src/app/workshop/skills/components/select-skills/select-skills.component';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrl: './create-class-dialog.component.scss',
})
export class CreateClassDialogComponent {
  form: FormGroup;

  skills: Skill[] = [];

  worlds: Signal<World[]>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
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
    let skillIds: number[] = this.skills.map(x => x.id);
    const dto: ClassCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
      worldId: this.form.controls['worldId'].value ?? null,
      skillIds: skillIds,
    };
    this._workshopService.createClass(dto).subscribe(() => {
      this._snackbar.open('Создание успешно.');
      this.context.completeWith(true);
    });
  }

  addSkills(): void {
    const data: SelectSkillsComponentData = {
      skills: this.skills,
      onlyPassvie: true,
      forCreateCharacter: false
    };

    this._dialogs
      .open<Skill[]>(new PolymorpheusComponent(SelectSkillsComponent), {
        data: data,
        size: 'page',
        closeable: false
      })
      .subscribe((val) => {
        this.skills = val;
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
