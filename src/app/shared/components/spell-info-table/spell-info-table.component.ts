import { Component, input } from '@angular/core';
import {
  ACTION_TYPE_LOCALIZATION,
  ATTACK_TYPE_LOCALIZATION,
  ActionType,
  AttackType,
  DAMAGE_TYPE_LOCALIZATION,
  DICE_LOCALIZATION,
  DamageType,
  Dice,
  MAGIC_SCHOOL_LOCALIZATION,
  MagicSchool,
} from '@core/enums';
import { Spell } from '@core/models';

import { tuiPure } from '@taiga-ui/cdk';

@Component({
  selector: 'app-spell-info-table',
  templateUrl: './spell-info-table.component.html',
  styleUrl: './spell-info-table.component.scss',
})
export class SpellInfoTableComponent {
  spell = input.required<Spell>();

  constructor() {}

  hasDamage(): boolean {
    return this.spell().hasDamage;
  }

  @tuiPure
  protected stringifyActionType(value: ActionType): string {
    return ACTION_TYPE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyAttackType(value: AttackType): string {
    return ATTACK_TYPE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyDice(value: Dice): string {
    return DICE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyDamageType(value: DamageType): string {
    return DAMAGE_TYPE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyMagicSchool(value: MagicSchool): string {
    return MAGIC_SCHOOL_LOCALIZATION[value];
  }
}
