import { ActionType, System } from '@core/enums';
import { ActionTime, ComponentsSpell, Damage } from '@core/models';

export interface SpellCreate {
  name: string;
  description: string;
  level: number;
  distance: number;
  actionType: ActionType;
  damage: Damage;
  actionTime: ActionTime;
  components: ComponentsSpell;
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
