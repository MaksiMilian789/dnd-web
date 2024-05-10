import { Component, input } from '@angular/core';
import {
  ACTION_TYPE_LOCALIZATION,
  ATTACK_TYPE_LOCALIZATION,
  ActionType,
  AttackType,
  CHARACTERISTICS_LOCALIZATION,
  CharacteristicsEnum,
  DAMAGE_TYPE_LOCALIZATION,
  DICE_LOCALIZATION,
  DamageType,
  Dice,
  ITEM_TYPE_LOCALIZATION,
  ItemType,
  RARE_LOCALIZATION,
  Rare,
} from '@core/enums';
import { Inventory } from '@core/models';

import { tuiPure } from '@taiga-ui/cdk';

@Component({
  selector: 'app-inventory-info-table',
  templateUrl: './inventory-info-table.component.html',
  styleUrl: './inventory-info-table.component.scss',
})
export class InventoryInfoTableComponent {
  inventory = input.required<Inventory>();

  constructor() {}

  hasDamage(): boolean {
    return this.inventory().attackType != AttackType.NotWeapon;
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
  protected stringifyItemType(value: ItemType): string {
    return ITEM_TYPE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyRare(value: Rare): string {
    return RARE_LOCALIZATION[value];
  }

  @tuiPure
  protected stringifyCharacteristics(value: CharacteristicsEnum): string {
    return CHARACTERISTICS_LOCALIZATION[value];;
  }
}
