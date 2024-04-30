export enum CharacteristicsEnum {
  Strength = 0,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma,
}

export const CHARACTERISTICS_LOCALIZATION: Record<CharacteristicsEnum, string> = {
  [CharacteristicsEnum.Strength]: 'Сила',
  [CharacteristicsEnum.Dexterity]: 'Ловкость',
  [CharacteristicsEnum.Constitution]: 'Телосложение',
  [CharacteristicsEnum.Intelligence]: 'Интеллект',
  [CharacteristicsEnum.Wisdom]: 'Мудрость',
  [CharacteristicsEnum.Charisma]: 'Харизма',
};
