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
import { ConditionCreate, Damage, DiceRoll, Skill, SkillCreate, SkillValue, World } from '@core/models';
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

  visions = ['Обычное', 'Тёмное', 'Видение сквозь маг тьму', 'Видение невидимых', 'Слепое', 'Истинное'];

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
    let skillValue: SkillValue = new SkillValue();
    if (this.chosenEffect()) {
      const val = this.effectForm;
      skillValue.effect.advantage = val.controls['advantage'].value;
      skillValue.effect.competent = val.controls['competent'].value;
      skillValue.effect.disAdvantage = val.controls['disAdvantage'].value;
      skillValue.effect.dynamic = val.controls['dynamic'].value;
      skillValue.effect.flat = val.controls['flat'].value;
      skillValue.effect.mastery = val.controls['mastery'].value;
      skillValue.effect.saveRoll = val.controls['saveRoll'].value;
    }
    if (this.chosenResistance()) {
      const val = this.resistanceForm;
      skillValue.resistance.damageType = val.controls['damageType'].value;
      skillValue.resistance.flat = val.controls['flat'].value;
    }
    if (this.chosenTypeVision()) {
      const val = this.typeVisionForm;
      skillValue.typeVision.name = val.controls['name'].value;
    }
    if (this.chosenDamage()) {
      const val = this.damageForm;
      let damageRoll: DiceRoll = new DiceRoll();
      damageRoll.dice = Number(val.controls['dice'].value);
      damageRoll.rolls = val.controls['rolls'].value;

      skillValue.damage.damageRoll = damageRoll;
      skillValue.damage.damageType = val.controls['damageType'].value;
      skillValue.damage.flat = val.controls['flat'].value;
      skillValue.damage.heal = val.controls['heal'].value;
    }
    if (this.chosenAttackBonus()) {
      const val = this.attackBonusForm;
      let damageRoll: DiceRoll = new DiceRoll();
      damageRoll.dice = Number(val.controls['dice'].value);
      damageRoll.rolls = val.controls['rolls'].value;
      let damage: Damage = new Damage();
      damage.damageRoll = damageRoll;
      damage.damageType = val.controls['damageType'].value;
      damage.flat = val.controls['flat'].value;
      damage.heal = false;

      skillValue.attackBonus.damage = damage;
      skillValue.attackBonus.accuracyBonus = val.controls['accuracyBonus'].value;
      skillValue.attackBonus.advantage = val.controls['advantage'].value;
      skillValue.attackBonus.disAdvantage = val.controls['disAdvantage'].value;
      skillValue.attackBonus.attackType = val.controls['type'].value;
    }
    if (this.chosenPerLevel()) {
      const val = this.perLevelForm;
      skillValue.perLevel.dynamic = val.controls['dynamic'].value;
      skillValue.perLevel.flat = val.controls['flat'].value;
    }
    if (this.chosenUseSpell()) {
      const val = this.useSpellForm;
      skillValue.useSpell = val.controls['useSpell'].value;
    }
    if (this.chosenItemType()) {
      const val = this.itemTypeForm;
      skillValue.itemType = val.controls['itemType'].value;
    }
    if (this.chosenLanguage()) {
      const val = this.languageForm;
      skillValue.language = val.controls['language'].value;
    }

    let skill: SkillCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      actionType: this.form.controls['actionType'].value,
      skillType: Number(this.form.controls['skillType'].value),
      value: skillValue,
      passive: this.form.controls['passive'].value,
      recharge: this.form.controls['recharge'].value,
      charges: this.form.controls['charges'].value,
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
    };

    this._workshopService.createSkill(skill).subscribe(() => {
      this._snackbar.open('Создание успешно.');
      this.context.completeWith(true);
    });
  }

  invalid(): boolean {
    if (this.chosenEffect()) {
      return this.form.invalid || this.effectForm.invalid;
    }
    if (this.chosenResistance()) {
      return this.form.invalid || this.resistanceForm.invalid;
    }
    if (this.chosenTypeVision()) {
      return this.form.invalid || this.typeVisionForm.invalid;
    }
    if (this.chosenDamage()) {
      return this.form.invalid || this.damageForm.invalid;
    }
    if (this.chosenAttackBonus()) {
      return this.form.invalid || this.attackBonusForm.invalid;
    }
    if (this.chosenPerLevel()) {
      return this.form.invalid || this.perLevelForm.invalid;
    }
    if (this.chosenUseSpell()) {
      return this.form.invalid || this.useSpellForm.invalid;
    }
    if (this.chosenItemType()) {
      return this.form.invalid || this.itemTypeForm.invalid;
    }
    if (this.chosenLanguage()) {
      return this.form.invalid || this.languageForm.invalid;
    }
    return this.form.invalid;
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

  onlyValue(): boolean {
    if (
      this.form.controls['skillType'].value >= SkillType.ClassArmor &&
      this.form.controls['skillType'].value <= SkillType.SpeedClimb
    ) {
      return true;
    }
    return false;
  }

  classArmor(): boolean {
    return this.form.controls['skillType'].value == SkillType.ClassArmor;
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
