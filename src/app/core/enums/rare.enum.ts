export enum Rare {
  Common = 0,
  Uncommon,
  Rare,
}

export const RARE_LOCALIZATION: Record<Rare, string> = {
  [Rare.Common]: 'Обычный',
  [Rare.Uncommon]: 'Необычный',
  [Rare.Rare]: 'Редкий',
};
