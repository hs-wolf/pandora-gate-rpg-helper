import { Inject } from 'typescript-ioc';
import { DEFAULT_PROFILE_IMAGE } from '../../constants';
import { UsersService } from '../users/usersService';
import { IAuthRepository } from './repos/authRepositoryInterface';
import { AuthRepositoryFirebaseAuth } from './repos/authRepositoryFirebaseAuth';
import {
  TokenClaims,
  User,
  UserRegisterBody,
  UserRoles,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class AuthService {
  @Inject
  private _usersService: UsersService;

  private _authRepo: IAuthRepository;

  constructor(authRepo: IAuthRepository) {
    this._authRepo = authRepo ?? new AuthRepositoryFirebaseAuth();
  }

  async userRegister(body: UserRegisterBody): Promise<void> {
    try {
      const authUser = await this._authRepo.createAuthUserWithEmailAndPassword(
        body.email,
        body.password
      );
      await this._usersService.createUser(
        User.fromMap({
          id: authUser.uid,
          role: UserRoles.PLAYER,
          name: body.name,
          picture: DEFAULT_PROFILE_IMAGE,
        })
      );
      await this._authRepo.setUserClaims(
        authUser.uid,
        TokenClaims.fromMap({ role: UserRoles.PLAYER })
      );
    } catch (error) {
      handleError(error);
    }
  }
}
