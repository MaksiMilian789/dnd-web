import { Component, Inject, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import {
  ACTION_TYPE_LOCALIZATION,
  ActionType,
  AttackType,
  COMPONENT_LOCALIZATION,
  ComponentEnum,
  DAMAGE_TYPE_LOCALIZATION,
  DICE_LOCALIZATION,
  DamageType,
  Dice,
  MAGIC_SCHOOL_LOCALIZATION,
  MagicSchool,
  System,
} from '@core/enums';
import {
  ActionTime,
  ComponentsSpell,
  ConditionCreate,
  Damage,
  DiceRoll,
  Skill,
  SpellCreate,
  World,
} from '@core/models';
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
  selector: 'app-create-spell-dialog',
  templateUrl: './create-spell-dialog.component.html',
  styleUrl: './create-spell-dialog.component.scss',
})
export class CreateSpellDialogComponent {
  form: FormGroup;
  damageForm: FormGroup;

  skills: Skill[] = [];

  worlds: Signal<World[]>;

  protected readonly damageTypes = DAMAGE_TYPE_LOCALIZATION;
  protected readonly dices = DICE_LOCALIZATION;
  protected readonly components = COMPONENT_LOCALIZATION;
  protected readonly actionTypes = ACTION_TYPE_LOCALIZATION;
  protected readonly magicSchools = MAGIC_SCHOOL_LOCALIZATION;

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
      level: new FormControl(0, [Validators.required]),
      distance: new FormControl(0, [Validators.required]),
      actionType: new FormControl<ActionType>(0, [Validators.required]),
      time: new FormControl(0, [Validators.required]),
      concentrate: new FormControl(false, [Validators.required]),
      magicSchool: new FormControl<MagicSchool>(0, [Validators.required]),
      hasDamage: new FormControl(false, [Validators.required]),
      component: new FormControl<ComponentEnum>(0, [Validators.required]),
      materials: new FormControl<string>(''),
      worldId: new FormControl<number | null>(null),
    });

    this.damageForm = new FormGroup({
      flat: new FormControl(0, [Validators.required]),
      rolls: new FormControl(0, [Validators.required]),
      dice: new FormControl<Dice>(0, [Validators.required]),
      damageType: new FormControl<DamageType>(0, [Validators.required]),
      heal: new FormControl(false, [Validators.required]),
    });

    this.worlds = toSignal(this._worldService.loadShortWorlds(this._authService.currentUser?.id!), {
      initialValue: [],
    });
  }

  create(): void {
    let skillIds: number[] = this.skills.map((x) => x.id);
    let damage: Damage = new Damage();

    if (this.form.controls['hasDamage'].value) {
      const val = this.damageForm;
      let damageRoll: DiceRoll = new DiceRoll();
      damageRoll.dice = val.controls['dice'].value;
      damageRoll.rolls = val.controls['rolls'].value;

      damage.damageRoll = damageRoll;
      damage.damageType = val.controls['damageType'].value;
      damage.flat = val.controls['flat'].value;
      damage.heal = val.controls['heal'].value;
    }

    let materials: string[] = [];
    if (this.form.controls['materials'].value) {
      materials = this.form.controls['materials'].value.split(',');
    }
    let components: ComponentsSpell = {
      materials: this.hasMaterials() ? materials : [],
      component: Number(this.form.controls['component'].value),
    };

    let actionTime: ActionTime = {
      time: this.form.controls['time'].value,
      concentrate: this.form.controls['concentrate'].value,
    };

    const dto: SpellCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
      worldId: this.form.controls['worldId'].value ?? null,
      skillIds: skillIds,
      level: this.form.controls['level'].value,
      distance: this.form.controls['distance'].value,
      actionType: this.form.controls['actionType'].value,
      damage: damage,
      actionTime: actionTime,
      // TODO: возможность нескольких компонентов
      components: [components],
      hasDamage: this.form.controls['hasDamage'].value,
      magicSchool: this.form.controls['magicSchool'].value,
    };
    this._workshopService.createSpell(dto).subscribe(() => {
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
        closeable: false,
      })
      .subscribe((val) => {
        this.skills = val;
      });
  }

  hasDamage(): boolean {
    return this.form.controls['hasDamage'].value;
  }

  hasMaterials(): boolean {
    return this.form.controls['component'].value == ComponentEnum.Material;
  }

  close(): void {
    this.context.completeWith(false);
  }

  @tuiPure
  protected stringifyWorld(): TuiStringHandler<number> {
    return (value: number) => this.worlds().find((x) => x.id == value)?.name || '';
  }

  @tuiPure
  protected stringifyDamageType(): TuiStringHandler<DamageType> {
    return (value: DamageType) => DAMAGE_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyDice(): TuiStringHandler<Dice> {
    return (value: Dice) => DICE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyComponents(): TuiStringHandler<ComponentEnum> {
    return (value: ComponentEnum) => COMPONENT_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyActionType(): TuiStringHandler<ActionType> {
    return (value: ActionType) => ACTION_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyMagicSchool(): TuiStringHandler<MagicSchool> {
    return (value: MagicSchool) => MAGIC_SCHOOL_LOCALIZATION[value] || '';
  }

  stopSort() {
    return 0;
  }
}
