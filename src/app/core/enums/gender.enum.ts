export enum Gender {
    Male = 0,
    Female,
  }
  
  export const GENDER_LOCALIZATION: Record<Gender, string> = {
    [Gender.Male]: 'Мужской',
    [Gender.Female]: 'Женский',
  };
  