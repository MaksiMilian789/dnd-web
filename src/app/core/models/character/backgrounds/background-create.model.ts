import { System } from '@core/enums';

export interface BackgroundCreate {
  name: string;
  description: string;
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
