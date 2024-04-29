import { AttackType, System } from "@core/enums";
import { Skill } from "./skills/skill.model";

export interface Inventory {
  id: number;
  name: string;
  description: string;
  //damage: Damage;
  attackType: AttackType;
  distance?: number;
  quantity?: number;
  system: System;
  skillInstance: Skill[];
}
