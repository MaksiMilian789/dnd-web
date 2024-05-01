export enum AttackType {
  NotWeapon = 0,
  MeleeWeapon,
  RangeWeapon,
  MeleeCast,
  RangeCast,
  NonWeapon,
}

export const ATTACK_TYPE_LOCALIZATION: Record<AttackType, string> = {
  [AttackType.NotWeapon]: 'Не оружие',
  [AttackType.MeleeWeapon]: 'Рукопашная атака',
  [AttackType.RangeWeapon]: 'Дальнобойная атака',
  [AttackType.MeleeCast]: 'Рукопашная атака заклинанием',
  [AttackType.RangeCast]: 'Дальнобойная атака заклинанием',
  [AttackType.NonWeapon]: 'Безоружная атака',
};
