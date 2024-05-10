import { Component, input } from '@angular/core';
import { ACTION_TYPE_LOCALIZATION, ATTACK_TYPE_LOCALIZATION, ActionType, AttackType, DAMAGE_TYPE_LOCALIZATION, DICE_LOCALIZATION, DamageType, Dice, ITEM_TYPE_LOCALIZATION, ItemType, LANGUAGE_LOCALIZATION, Language, RECHARGE_LOCALIZATION, Recharge, SKILL_TYPE_LOCALIZATION, SkillType } from '@core/enums';

import { Skill } from '@core/models';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-skill-info-table',
  templateUrl: './skill-info-table.component.html',
  styleUrl: './skill-info-table.component.scss',
})
export class SkillInfoTableComponent {
  skill = input.required<Skill>();

  skillTypes = SkillType;

  constructor() {}

  isCharacteristics(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= 0 && skillType <= SkillType.Charisma) {
      return true;
    }
    return false;
  }

  isSkill(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.Athletics && skillType <= SkillType.Persuasion) {
      return true;
    }
    return false;
  }

  isAll(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.AllSaveRoll || skillType == SkillType.AllSkillCheck) {
      return true;
    }
    return false;
  }

  isOnlyEffectValue(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.ClassArmor && skillType <= SkillType.SpeedClimb) {
      return true;
    }
    return false;
  }

  isResistance(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.Resistance && skillType <= SkillType.Flat) {
      return true;
    }
    return false;
  }

  isDamageHeal(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.Damage && skillType <= SkillType.Heal) {
      return true;
    }
    return false;
  }

  isVision(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.Vision) {
      return true;
    }
    return false;
  }

  isAttackBonus(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.AttackBonus) {
      return true;
    }
    return false;
  }

  isPerLevel(): boolean {
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.Hp && skillType <= SkillType.Hp) {
      return true;
    }
    return false;
  }

  isLanguage(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.Language) {
      return true;
    }
    return false;
  }

  isItemType(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.ItemType) {
      return true;
    }
    return false;
  }

  isUseSpell(): boolean {
    let skillType = this.skill().skillType;
    if (skillType == SkillType.UseSpell) {
      return true;
    }
    return false;
  }

  isSpeed(): boolean{
    let skillType = this.skill().skillType;
    if (skillType >= SkillType.Speed && skillType <= SkillType.SpeedClimb) {
      return true;
    }
    return false;
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
  protected stringifySkillType(value: SkillType): string {
    return SKILL_TYPE_LOCALIZATION[value];
  }
  
  @tuiPure
  protected stringifyRecharge(value: Recharge): string {
    return RECHARGE_LOCALIZATION[value];
  }
  
  @tuiPure
  protected stringifyLanguage(value: Language): string {
    return LANGUAGE_LOCALIZATION[value];
  }
  
  @tuiPure
  protected stringifyItemType(value: ItemType): string {
    return ITEM_TYPE_LOCALIZATION[value];
  }
}
