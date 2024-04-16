export enum ActionType {
  Reaction = 0,
  Action,
  BonusAction
  }
  
  export const ACTION_TYPE_LOCALIZATION: Record<ActionType, string> = {
    [ActionType.Reaction]: 'Реакция',
    [ActionType.Action]: 'Действие',
    [ActionType.BonusAction]: 'Бонусное действие',
  };
  