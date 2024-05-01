export enum CharacteristicsEnum {
  None = 0,
  Strength,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma,
}

export const CHARACTERISTICS_LOCALIZATION: Record<CharacteristicsEnum, string> = {
  [CharacteristicsEnum.None]: 'Нет',
  [CharacteristicsEnum.Strength]: 'Сила',
  [CharacteristicsEnum.Dexterity]: 'Ловкость',
  [CharacteristicsEnum.Constitution]: 'Телосложение',
  [CharacteristicsEnum.Intelligence]: 'Интеллект',
  [CharacteristicsEnum.Wisdom]: 'Мудрость',
  [CharacteristicsEnum.Charisma]: 'Харизма',
};
