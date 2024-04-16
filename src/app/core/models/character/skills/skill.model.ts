import { SkillType, System } from "@core/enums";
import { ActionType } from "@core/enums/action-type.enum";
import { SkillValue } from "./skill-value.model";

export interface Skill {
  id: number;
  name: string;
  description: string;
  actionType: ActionType;
  skillType: SkillType;
  value: SkillValue;
  distance?: number;
  passive: boolean;
  recharge: number;
  charges: number;
  system: System;
}
