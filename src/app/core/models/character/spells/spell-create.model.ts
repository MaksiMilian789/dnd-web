import { ActionType, MagicSchool, System } from '@core/enums';
import { ActionTime, ComponentsSpell, Damage } from '@core/models';

export interface SpellCreate {
  name: string;
  description: string;
  magicSchool: MagicSchool;
  hasDamage: boolean;
  level: number;
  distance: number;
  actionType: ActionType;
  damage: Damage;
  actionTime: ActionTime;
  components: ComponentsSpell[];
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
