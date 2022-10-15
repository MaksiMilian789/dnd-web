export enum role {
  common = 0,
  admin = 1,
}

export interface User {
  login: string;
  fio: string;
  role: role;
}
