import { AttackType, CharacteristicsEnum, ItemType, Rare, System } from '@core/enums';
import { Damage } from '@core/models';

export interface InventoryCreate {
  name: string;
  description: string;
  damage: Damage;
  attackType: AttackType;
  attachment: boolean;
  rare: Rare;
  type: ItemType;
  mainCharacteristic: CharacteristicsEnum;
  imageId?: number;
  distance?: number;
  system: System;
  authorId: number;
  skillIds: number[];
  worldId?: number;
}
