import { User, UserUpdateBody } from '@pandora-gate-rpg-helper/models';

export interface IUsersRepository {
  getUserById(userId: string): Promise<User>;

  createUser(user: User): Promise<User>;

  updateUser(userId: string, body: UserUpdateBody): Promise<void>;

  deleteUser(userId: string): Promise<void>;
}
