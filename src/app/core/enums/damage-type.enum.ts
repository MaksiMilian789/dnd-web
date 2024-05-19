export enum DamageType {
  Fire = 0,
  Cold,
  Acid,
  Poison,
  Lightning,
  Thunder,
  Force,
  Psychic,
  Necrotic,
  Radiant,
  Piercing,
  Slashing,
  Bludgeoning
}

export const DAMAGE_TYPE_LOCALIZATION: Record<DamageType, string> = {
  [DamageType.Fire]: 'Огонь',
  [DamageType.Cold]: 'Холод',
  [DamageType.Acid]: "Кислота",
  [DamageType.Poison]: "Яд",
  [DamageType.Lightning]: "Электричество",
  [DamageType.Thunder]: "Звук",
  [DamageType.Force]: "Силовой",
  [DamageType.Psychic]: "Психический",
  [DamageType.Necrotic]: "Некротический",
  [DamageType.Radiant]: "Излучение",
  [DamageType.Piercing]: "Колющий",
  [DamageType.Slashing]: "Рубящий",
  [DamageType.Bludgeoning]: "Дробящий"
};
