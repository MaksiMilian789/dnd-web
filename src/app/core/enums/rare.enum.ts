export enum Rare {
  Common = 0,
  Uncommon,
  Rare,
  VeryRare,
  Legendary,
  Artifact
}

export const RARE_LOCALIZATION: Record<Rare, string> = {
  [Rare.Common]: 'Обычный',
  [Rare.Uncommon]: 'Необычный',
  [Rare.Rare]: 'Редкий',
  [Rare.VeryRare]: "Очень редкий",
  [Rare.Legendary]: "Легендарный",
  [Rare.Artifact]: "Артефакт"
};
