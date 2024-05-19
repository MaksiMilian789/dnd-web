export enum Ideology {
  Neutral = 0,
  NeutralGood,
  NeutralEvil,
  LawfulNeutral,
  LawfulGood,
  LawfulEvil,
  ChaoticNeutral,
  ChaoticGood,
  ChaoticEvil
}

export const IDEOLOGY_LOCALIZATION: Record<Ideology, string> = {
  [Ideology.Neutral]: 'Нейтральный',
  [Ideology.NeutralGood]: "Нейтральный добрый",
  [Ideology.NeutralEvil]: "Нейтральный злой",
  [Ideology.LawfulNeutral]: "Законопослушый добрый",
  [Ideology.LawfulGood]: "Законопослушный нейтральный",
  [Ideology.LawfulEvil]: "Законопослушый злой",
  [Ideology.ChaoticNeutral]: "Хаотично нейтральный",
  [Ideology.ChaoticGood]: "Хаотично добрый",
  [Ideology.ChaoticEvil]: "Хаотично злой"
};
