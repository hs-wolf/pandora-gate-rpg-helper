import { IUsersRepository } from './repos/usersRepositoryInterface';
import { UsersRepositoryFirestore } from './repos/usersRepositoryFirestore';
import {
  ApiError,
  ResponseCodes,
  User,
  UserUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class UsersService {
  private _usersRepo: IUsersRepository;

  constructor(usersRepo?: IUsersRepository) {
    this._usersRepo = usersRepo ?? new UsersRepositoryFirestore();
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this._usersRepo.getUserById(userId);
      if (!user) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find user with userId: ${userId}.`
        );
      }
      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async createUser(user: User): Promise<void> {
    try {
      await this._usersRepo.createUser(user);
    } catch (error) {
      handleError(error);
    }
  }

  async updateUser(userId: string, body: UserUpdateBody): Promise<void> {
    try {
      await this._usersRepo.updateUser(userId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this._usersRepo.deleteUser(userId);
    } catch (error) {
      handleError(error);
    }
  }
}
