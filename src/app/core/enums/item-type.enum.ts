export enum ItemType {
  CommonWeapon = 0,
  WarriorWeapon,
  LightArmor,
  MediumArmor,
  HeavyArmor,
  Shield
}

export const ITEM_TYPE_LOCALIZATION: Record<ItemType, string> = {
  [ItemType.CommonWeapon]: 'Обычное оружие',
  [ItemType.WarriorWeapon]: 'Воинское оружие',
  [ItemType.LightArmor]: 'Лёгкая броня',
  [ItemType.MediumArmor]: 'Средняя броня',
  [ItemType.HeavyArmor]: 'Тяжёлая броня',
  [ItemType.Shield]: 'Щит',
};
