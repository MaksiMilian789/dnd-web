import { AttackType, CharacteristicsEnum, ItemType, Rare, System } from '@core/enums';
import { Skill } from './skills/skill.model';

export interface Inventory {
  id: number;
  name: string;
  description: string;
  //damage: Damage;
  attackType: AttackType;
  distance?: number;
  quantity?: number;
  attachment: boolean;
  rare: Rare;
  type: ItemType;
  mainCharacteristic: CharacteristicsEnum;
  equipped: boolean;
  imageId?: number;
  system: System;
  skillInstance: Skill[];
}
