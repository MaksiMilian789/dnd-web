export enum Role {
  Master = 0,
  Player,
  }
  
  export const ROLE_LOCALIZATION: Record<Role, string> = {
    [Role.Master]: 'Мастер',
    [Role.Player]: 'Игрок',
  };
  