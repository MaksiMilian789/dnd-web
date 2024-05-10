import { Skill } from "@core/models";

export interface Class {
  id: number;
  name: string;
  description: string;
  skillInstances: Skill[];
  authorId?: number;
  worldId?: number;
}
