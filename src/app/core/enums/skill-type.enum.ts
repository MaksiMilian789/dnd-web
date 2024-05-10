export enum SkillType {
  // Effect
  Strength = 0,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom,
  Charisma,
  Athletics,
  Acrobatics,
  SleightOfHand,
  Stealth,
  Investigation,
  History,
  Arcana,
  Nature,
  Religion,
  Perception,
  Survival,
  Medicine,
  Insight,
  AnimalHandling,
  Performance,
  Intimidation,
  Deception,
  Persuasion,
  AllSaveRoll,
  AllSkillCheck,
  ClassArmor,
  MaxHp,
  DifficultSpellCheck,
  AddHp,
  AttackCount,
  Initiative,
  Speed,
  SpeedFly,
  SpeedSwim,
  SpeedClimb,
  // Resistance
  Resistance,
  Immunity,
  Vulnerability,
  Flat,
  // Damage/heal
  Damage,
  Heal,
  // Vision
  Vision,
  // AttackBonus
  AttackBonus,
  // PerLevel
  Hp,
  // Other
  Language,
  ItemType,
  UseSpell
}

export const EFFECT_START = 0;
export const EFFECT_END = SkillType.SpeedClimb;

export const RESISTANCE_START = SkillType.Resistance;
export const RESISTANCE_END = SkillType.Flat;

export const DAMAGE_HEAL_START = SkillType.Damage;
export const DAMAGE_HEAL_END = SkillType.Heal;

export const VISION_START = SkillType.Vision;
export const VISION_END = SkillType.Vision;

export const ATTACK_BONUS_START = SkillType.AttackBonus;
export const ATTACK_BONUS_END = SkillType.AttackBonus;

export const PER_LEVEL_START = SkillType.Hp;
export const PER_LEVEL_END = SkillType.Hp;

export const LANGUAGE = SkillType.Language;
export const ITEM_TYPE = SkillType.ItemType;
export const USE_SPELL = SkillType.UseSpell;

export const SKILL_TYPE_LOCALIZATION: Record<SkillType, string> = {
  [SkillType.Strength]: 'Сила',
  [SkillType.Dexterity]: "Ловкость",
  [SkillType.Constitution]: "Телосложение",
  [SkillType.Intelligence]: "Интеллект",
  [SkillType.Wisdom]: "Мудрость",
  [SkillType.Charisma]: "Харизма",
  [SkillType.Athletics]: "Атлетика",
  [SkillType.Acrobatics]: "Акробатика",
  [SkillType.SleightOfHand]: "Ловкость рук",
  [SkillType.Stealth]: "Скрытность",
  [SkillType.Investigation]: "Анализ",
  [SkillType.History]: "История",
  [SkillType.Arcana]: "Магия",
  [SkillType.Nature]: "Природа",
  [SkillType.Religion]: "Религия",
  [SkillType.Perception]: "Внимательность",
  [SkillType.Survival]: "Выживание",
  [SkillType.Medicine]: "Медицина",
  [SkillType.Insight]: "Проницательность",
  [SkillType.AnimalHandling]: "Уход за животными",
  [SkillType.Performance]: "Выступление",
  [SkillType.Intimidation]: "Запугивание",
  [SkillType.Deception]: "Обман",
  [SkillType.Persuasion]: "Убеждение",
  [SkillType.ClassArmor]: "Класс брони",
  [SkillType.MaxHp]: "Max HP",
  [SkillType.AllSaveRoll]: "Все спасброски",
  [SkillType.AllSkillCheck]: "Все проверки навыков",
  [SkillType.DifficultSpellCheck]: "Сложность спасброска",
  [SkillType.AddHp]: "Доп. HP",
  [SkillType.AttackCount]: "Число атак",
  [SkillType.Speed]: "Скорость",
  [SkillType.SpeedFly]: "Скорость полёта",
  [SkillType.SpeedSwim]: "Скорость плавания",
  [SkillType.SpeedClimb]: "Скорость лазания",
  [SkillType.Resistance]: "Сопротивление",
  [SkillType.Immunity]: "Иммунитет",
  [SkillType.Vulnerability]: "Уязвимость",
  [SkillType.Flat]: "Плоская защита от урона",
  [SkillType.Damage]: "Урон",
  [SkillType.Heal]: "Лечение",
  [SkillType.Vision]: "Тип зрения",
  [SkillType.AttackBonus]: "Бонус к попаданию",
  [SkillType.Hp]: "HP за уровень",
  [SkillType.Language]: "Язык",
  [SkillType.ItemType]: "Владение типом предметов",
  [SkillType.UseSpell]: "Использование заклинания",
  [SkillType.Initiative]: "Инициатива"
};
