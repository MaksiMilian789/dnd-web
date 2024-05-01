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
  ClassArmor,
  MaxHp,
  AllSaveRoll,
  AllSkillCheck,
  DifficultSpellCheck,
  AddHp,
  AttackCount,
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
export const EFFECT_END = 34;

export const RESISTANCE_START = 35;
export const RESISTANCE_END = 38;

export const DAMAGE_HEAL_START = 39;
export const DAMAGE_HEAL_END = 40;

export const VISION_START = 41;
export const VISION_END = 41;

export const ATTACK_BONUS_START = 42;
export const ATTACK_BONUS_END = 42;

export const PER_LEVEL_START = 43;
export const PER_LEVEL_END = 43;

export const LANGUAGE = 44;
export const ITEM_TYPE = 45;
export const USE_SPELL = 46;

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
    [SkillType.UseSpell]: "Использование заклинания"
};
