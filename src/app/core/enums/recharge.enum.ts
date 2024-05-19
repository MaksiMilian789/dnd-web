export enum Recharge {
  ShortRest = 0,
  LongRest,
  d2,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d25,
  d100,
  none
}

export const RECHARGE_LOCALIZATION: Record<Recharge, string> = {
  [Recharge.ShortRest]: 'Короткий отдых',
  [Recharge.LongRest]: 'Длинный отдых',
  [Recharge.d2]: 'd2',
  [Recharge.d4]: 'd4',
  [Recharge.d6]: 'd6',
  [Recharge.d8]: 'd8',
  [Recharge.d10]: 'd10',
  [Recharge.d12]: 'd12',
  [Recharge.d20]: 'd20',
  [Recharge.d25]: 'd25',
  [Recharge.d100]: 'd100',
  [Recharge.none]: "Нет перезарядки"
};
