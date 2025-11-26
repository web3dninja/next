export enum RoleEnum {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export type Role = 'ADMIN' | 'MODERATOR' | 'USER';

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
