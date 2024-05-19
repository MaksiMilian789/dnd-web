export enum ItemType {
  CommonWeapon = 0,
  WarriorWeapon,
  LightArmor,
  MediumArmor,
  HeavyArmor,
  Shield,
  MagicItem,
  Scroll,
  Potion,
  Ammo,
  Other
}

export const ITEM_TYPE_LOCALIZATION: Record<ItemType, string> = {
  [ItemType.CommonWeapon]: 'Обычное оружие',
  [ItemType.WarriorWeapon]: 'Воинское оружие',
  [ItemType.LightArmor]: 'Лёгкая броня',
  [ItemType.MediumArmor]: 'Средняя броня',
  [ItemType.HeavyArmor]: 'Тяжёлая броня',
  [ItemType.Shield]: 'Щит',
  [ItemType.MagicItem]: "Чудесный предмет",
  [ItemType.Scroll]: "Свиток",
  [ItemType.Potion]: "Зелье",
  [ItemType.Ammo]: "Боеприпас",
  [ItemType.Other]: "Прочее"
};
