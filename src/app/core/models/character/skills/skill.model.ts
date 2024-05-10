import { Recharge, SkillType, System } from "@core/enums";
import { ActionType } from "@core/enums/action-type.enum";
import { SkillValue } from "./skill-value.model";
import { ActionTime } from "../spells/action-time.model";

export interface Skill {
  id: number;
  name: string;
  description: string;
  actionType: ActionType;
  skillType: SkillType;
  value: SkillValue;
  actionTime: ActionTime;
  distance?: number;
  passive: boolean;
  recharge: Recharge;
  currentCharges: number;
  charges: number;
  hidden: boolean;
  system: System;
  activated: boolean
  authorId?: number;
  worldId?: number;
}
