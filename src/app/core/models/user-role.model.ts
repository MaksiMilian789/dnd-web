import { Role } from "@core/enums";

export interface UserRole {
  id: number;
  name: string;
  role: Role | null;
}
