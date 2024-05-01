export enum Dice {
  d2 = 0,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d25,
  d100,
}

export const DICE_LOCALIZATION: Record<Dice, string> = {
  [Dice.d2]: 'd2',
  [Dice.d4]: 'd4',
  [Dice.d6]: 'd6',
  [Dice.d8]: 'd8',
  [Dice.d10]: 'd10',
  [Dice.d12]: 'd12',
  [Dice.d20]: 'd20',
  [Dice.d25]: 'd25',
  [Dice.d100]: 'd100',
};
