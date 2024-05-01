import { AttackType, System } from "@core/enums";
import { ActionTime, Damage, Skill } from "@core/models";

export interface Spell {
  id: number;
  name: string;
  description: string;
  level: number;
  damage: Damage;
  attackType: AttackType;
  actionTime: ActionTime;
  //components: 
  distance?: number;
  system: System;
  skillInstance: Skill[];
}
