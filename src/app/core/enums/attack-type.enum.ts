export enum AttackType {
  MeleeWeapon = 0,
  RangeWeapon,
  MeleeCast,
  RangeCast,
  NonWeapon
  }
  
  export const ATTACK_TYPE_LOCALIZATION: Record<AttackType, string> = {
    [AttackType.MeleeWeapon]: 'Рукопашная атака',
    [AttackType.RangeWeapon]: 'Дальнобойная атака',
    [AttackType.MeleeCast]: 'Рукопашная атака заклинанием',
    [AttackType.RangeCast]: 'Дальнобойная атака заклинанием',
    [AttackType.NonWeapon]: 'Безоружная атака',
  };
  