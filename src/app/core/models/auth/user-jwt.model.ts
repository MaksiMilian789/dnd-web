import { JwtPayload, jwtDecode } from 'jwt-decode';
import { User } from './user.model';

export type AuthJwtPayload = JwtPayload & {
  /** Идентификатор. */
  nameid: string;

  /** Логин. */
  unique_name: string;
};

/** Представляет модель пользователя. */
export class UserJwt implements User {
  /** Идентификатор. */
  id: number;

  /** Логин */
  login: string;

  constructor(accessToken: string) {
    const decoded = jwtDecode<AuthJwtPayload>(accessToken);

    this.id = Number.parseInt(decoded.nameid);
    this.login = decoded.unique_name;
  }
}
