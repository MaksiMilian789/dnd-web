import { System } from "@core/enums";

export interface RaceCreate {
  name: string;
  description: string;
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
