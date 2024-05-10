import { Skill } from '../skills/skill.model';

export interface Background {
  id: number;
  name: string;
  description: string;
  skillInstances: Skill[];
  authorId?: number;
  worldId?: number;
}
