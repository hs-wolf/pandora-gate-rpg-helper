import { User } from './users-classes';

export type UserUpdateBody = Partial<Omit<User, 'id' | 'role'>>;

export type UserHeader = Partial<Pick<User, 'id' | 'name'>>;
