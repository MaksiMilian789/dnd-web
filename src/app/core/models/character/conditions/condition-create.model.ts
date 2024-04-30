import { System } from '@core/enums';

export interface ConditionCreate {
  name: string;
  description: string;
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
