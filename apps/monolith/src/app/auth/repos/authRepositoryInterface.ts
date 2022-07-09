import { UserRecord } from 'firebase-admin/auth';
import { TokenClaims } from '@pandora-gate-rpg-helper/models';

export interface IAuthRepository {
  setUserClaims(uid: string, claims: TokenClaims): Promise<void>;

  createAuthUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserRecord>;

  deleteAuthUser(uid: string): Promise<void>;
}
