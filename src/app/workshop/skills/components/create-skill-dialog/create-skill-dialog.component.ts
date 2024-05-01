import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import {
  ACTION_TYPE_LOCALIZATION,
  ATTACK_BONUS_END,
  ATTACK_BONUS_START,
  ATTACK_TYPE_LOCALIZATION,
  ActionType,
  AttackType,
  DAMAGE_HEAL_END,
  DAMAGE_HEAL_START,
  DAMAGE_TYPE_LOCALIZATION,
  DICE_LOCALIZATION,
  DamageType,
  Dice,
  EFFECT_END,
  EFFECT_START,
  ITEM_TYPE,
  ITEM_TYPE_LOCALIZATION,
  ItemType,
  LANGUAGE,
  LANGUAGE_LOCALIZATION,
  Language,
  PER_LEVEL_END,
  PER_LEVEL_START,
  RECHARGE_LOCALIZATION,
  RESISTANCE_END,
  RESISTANCE_START,
  Recharge,
  SKILL_TYPE_LOCALIZATION,
  SkillType,
  System,
  USE_SPELL,
  VISION_END,
  VISION_START,
} from '@core/enums';
import { ConditionCreate, Skill, SkillValue, World } from '@core/models';
import { WorkshopService } from '@core/services/api/workshop.service';
import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';

@Component({
  selector: 'app-create-skill-dialog',
  templateUrl: './create-skill-dialog.component.html',
  styleUrl: './create-skill-dialog.component.scss',
})
export class CreateSkillDialogComponent {
  form: FormGroup;
  effectForm: FormGroup;
  resistanceForm: FormGroup;
  typeVisionForm: FormGroup;
  damageForm: FormGroup;
  attackBonusForm: FormGroup;
  perLevelForm: FormGroup;
  useSpellForm: FormGroup;
  itemTypeForm: FormGroup;
  languageForm: FormGroup;

  worlds: Signal<World[]>;
  protected readonly actionTypes = ACTION_TYPE_LOCALIZATION;
  protected readonly recharges = RECHARGE_LOCALIZATION;
  protected readonly skillTypes = SKILL_TYPE_LOCALIZATION;
  protected readonly damageTypes = DAMAGE_TYPE_LOCALIZATION;
  protected readonly dices = DICE_LOCALIZATION;
  protected readonly attackTypes = ATTACK_TYPE_LOCALIZATION;
  protected readonly itemTypes = ITEM_TYPE_LOCALIZATION;
  protected readonly languages = LANGUAGE_LOCALIZATION;

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
      actionType: new FormControl<ActionType>(ActionType.None, [Validators.required]),
      skillType: new FormControl<SkillType | null>(null, [Validators.required]),
      distance: new FormControl(null),
      passive: new FormControl(false, [Validators.required]),
      recharge: new FormControl<Recharge>(0, [Validators.required]),
      charges: new FormControl(0, [Validators.required]),
      worldId: new FormControl<number | null>(null),
    });

    this.effectForm = new FormGroup({
      flat: new FormControl(0, [Validators.required]),
      dynamic: new FormControl(0, [Validators.required]),
      advantage: new FormControl(false, [Validators.required]),
      disAdvantage: new FormControl(false, [Validators.required]),
      mastery: new FormControl(false, [Validators.required]),
      competent: new FormControl(false, [Validators.required]),
      saveRoll: new FormControl(false, [Validators.required]),
    });

    this.resistanceForm = new FormGroup({
      flat: new FormControl<number | null>(null, [Validators.required]),
      damageType: new FormControl<DamageType>(0, [Validators.required]),
    });

    this.typeVisionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.damageForm = new FormGroup({
      flat: new FormControl(0, [Validators.required]),
      rolls: new FormControl(0, [Validators.required]),
      dice: new FormControl<Dice>(0, [Validators.required]),
      damageType: new FormControl<DamageType>(0, [Validators.required]),
      heal: new FormControl(false, [Validators.required]),
    });

    this.attackBonusForm = new FormGroup({
      type: new FormControl<AttackType>(0, [Validators.required]),
      accuracyBonus: new FormControl(0, [Validators.required]),
      flat: new FormControl(0, [Validators.required]),
      rolls: new FormControl(0, [Validators.required]),
      dice: new FormControl<Dice>(0, [Validators.required]),
      damageType: new FormControl<DamageType>(0, [Validators.required]),
      advantage: new FormControl(false, [Validators.required]),
      disAdvantage: new FormControl(false, [Validators.required]),
    });

    this.perLevelForm = new FormGroup({
      flat: new FormControl(0, [Validators.required]),
      dynamic: new FormControl(0, [Validators.required]),
    });

    this.useSpellForm = new FormGroup({
      useSpell: new FormControl('', [Validators.required]),
    });

    this.itemTypeForm = new FormGroup({
      itemType: new FormControl<ItemType>(0, [Validators.required]),
    });

    this.languageForm = new FormGroup({
      language: new FormControl<Language>(0, [Validators.required]),
    });

    this.worlds = toSignal(this._worldService.loadShortWorlds(this._authService.currentUser?.id!), {
      initialValue: [],
    });
  }

  create(): void {
    /*let skillIds: number[] = this.skills.map(x => x.id);
    const dto: ConditionCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
      worldId: this.form.controls['worldId'].value ?? null,
      skillIds: skillIds,
    };
    this._workshopService.createCondition(dto).subscribe(() => {
      this._snackbar.open('Создание успешно.');
      this.context.completeWith(true);
    });*/
  }

  close(): void {
    this.context.completeWith(false);
  }

  chosenEffect(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= EFFECT_START && type <= EFFECT_END;
    }
    return false;
  }

  chosenResistance(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= RESISTANCE_START && type <= RESISTANCE_END;
    }
    return false;
  }

  chosenTypeVision(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= VISION_START && type <= VISION_END;
    }
    return false;
  }

  chosenDamage(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= DAMAGE_HEAL_START && type <= DAMAGE_HEAL_END;
    }
    return false;
  }

  chosenAttackBonus(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= ATTACK_BONUS_START && type <= ATTACK_BONUS_END;
    }
    return false;
  }

  chosenPerLevel(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type >= PER_LEVEL_START && type <= PER_LEVEL_END;
    }
    return false;
  }

  chosenUseSpell(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type == USE_SPELL;
    }
    return false;
  }

  chosenItemType(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type == ITEM_TYPE;
    }
    return false;
  }

  chosenLanguage(): boolean {
    if (this.form.controls['skillType'].value != null) {
      const type = this.form.controls['skillType'].value;
      return type == LANGUAGE;
    }
    return false;
  }

  @tuiPure
  protected stringifyWorld(): TuiStringHandler<number> {
    return (value: number) => this.worlds().find((x) => x.id == value)?.name || '';
  }

  @tuiPure
  protected stringifyActionType(): TuiStringHandler<ActionType> {
    return (value: ActionType) => ACTION_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyRecharge(): TuiStringHandler<Recharge> {
    return (value: Recharge) => RECHARGE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifySkillType(): TuiStringHandler<SkillType> {
    return (value: SkillType) => SKILL_TYPE_LOCALIZATION[value] || 'Тип способности';
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
  protected stringifyAttackType(): TuiStringHandler<AttackType> {
    return (value: AttackType) => ATTACK_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyItemType(): TuiStringHandler<ItemType> {
    return (value: ItemType) => ITEM_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyLanguage(): TuiStringHandler<Language> {
    return (value: Language) => LANGUAGE_LOCALIZATION[value] || '';
  }

  stopSort() {
    return 0;
  }
}
