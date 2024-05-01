import { AttackType, DamageType, Dice, ItemType, Language, SkillType } from '@core/enums';

export class SkillValue {
  type: SkillType = 0;
  resistance: Resistance = new Resistance();
  typeVision: TypeVision = new TypeVision();
  effect: Effect = new Effect();
  damage: Damage = new Damage();
  attackBonus: AttackBonus = new AttackBonus();
  perLevel: PerLevel = new PerLevel();
  useSpell: string = "";
  itemType: ItemType = 0;
  language: Language = 0;
}

export class Resistance {
  flat: number | null = null;
  damageType: DamageType = 0;
}

export class TypeVision {
  name: string = "";
}

export class Effect {
  flat: number = 0;
  dynamic: number = 0;
  advantage: boolean = false;
  disAdvantage: boolean = false;
  mastery: boolean = false;
  competent: boolean = false;
  saveRoll: boolean = false;
}

export class Damage {
  flat: number = 0;
  damageRoll: DiceRoll = new DiceRoll();
  damageType: DamageType = 0;
  heal: boolean = false;
}

export class DiceRoll {
  rolls: number = 0;
  dice: Dice = 0;
}

export class AttackBonus {
  attackType: AttackType = 0;
  accuracyBonus: number = 0;
  damage: Damage = new Damage();
  advantage: boolean = false;
  disAdvantage: boolean = false;
}

export class PerLevel {
  flat: number = 0;
  dynamic: number = 0;
}
