export enum MagicSchool {
  Necromancy = 0,
  Evocation,
  Illusion,
  Conjuration,
  Abjuration,
  Enchantment,
  Transmutation,
  Divination
}

export const MAGIC_SCHOOL_LOCALIZATION: Record<MagicSchool, string> = {
  [MagicSchool.Necromancy]: 'Некромантия',
  [MagicSchool.Evocation]: "Воплощение",
  [MagicSchool.Illusion]: "Иллюзия",
  [MagicSchool.Conjuration]: "Вызов",
  [MagicSchool.Abjuration]: "Ограждение",
  [MagicSchool.Enchantment]: "Очарование",
  [MagicSchool.Transmutation]: "Преобразование",
  [MagicSchool.Divination]: "Прорицание"
};
