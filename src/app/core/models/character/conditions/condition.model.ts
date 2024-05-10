import { System } from "@core/enums";
import { Skill } from "../skills/skill.model";

export interface Condition {
  id: number;
  name: string;
  description: string;
  system: System;
  authorId?: number;
  worldId?: number;
  skillInstances: Skill[];
}
