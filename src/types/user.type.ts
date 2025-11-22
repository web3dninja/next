export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
}

export interface UserWithPassword extends User {
  password: string;
}

export type CreateUserInput = Omit<UserWithPassword, 'id'>;
