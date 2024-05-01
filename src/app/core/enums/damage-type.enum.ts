export enum DamageType {
  Fire = 0,
  Cold,
}

export const DAMAGE_TYPE_LOCALIZATION: Record<DamageType, string> = {
  [DamageType.Fire]: 'Огонь',
  [DamageType.Cold]: 'Холод',
};
