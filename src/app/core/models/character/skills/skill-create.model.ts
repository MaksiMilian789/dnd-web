import { ActionType, Recharge, SkillType, System } from '@core/enums';
import { SkillValue } from './skill-value.model';

export interface SkillCreate {
  name: string;
  description: string;
  actionType: ActionType;
  skillType: SkillType;
  value: SkillValue;
  distance?: number;
  passive: boolean;
  recharge: Recharge;
  charges: number;
  system: System;
  authorId: number;
  worldId?: number;
}
