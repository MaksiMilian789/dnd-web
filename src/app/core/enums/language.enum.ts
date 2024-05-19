export enum Language {
  Common = 0,
  Elf,
  Dwarf,
  Gnom,
  Goblin,
  Giant,
  Orc,
  Abyss,
  Deep,
  Dragon,
  Infernal,
  Sky,
  First,
  Under,
  Sylvan
}

export const LANGUAGE_LOCALIZATION: Record<Language, string> = {
  [Language.Common]: 'Общий',
  [Language.Elf]: "Эльфийский",
  [Language.Dwarf]: "Дварфийский",
  [Language.Gnom]: "Гномий",
  [Language.Goblin]: "Гоблинский",
  [Language.Giant]: "Великаний",
  [Language.Orc]: "Орочий",
  [Language.Abyss]: "Бездны",
  [Language.Deep]: "Глубинная речь",
  [Language.Dragon]: "Драконий",
  [Language.Infernal]: "Инфернальный",
  [Language.Sky]: "Небесный",
  [Language.First]: "Первичный",
  [Language.Under]: "Подземный",
  [Language.Sylvan]: "Сильван"
};
