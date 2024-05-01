import { AttackType, MagicSchool, System } from "@core/enums";
import { ActionTime, ComponentsSpell, Damage, Skill } from "@core/models";

export interface Spell {
  id: number;
  name: string;
  description: string;
  magicSchool: MagicSchool;
  hasDamage: boolean;
  level: number;
  damage: Damage;
  attackType: AttackType;
  actionTime: ActionTime;
  components: ComponentsSpell[];
  distance?: number;
  system: System;
  skillInstance: Skill[];
}
