import { IAuthRepository } from './authRepositoryInterface';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { TokenClaims } from '@pandora-gate-rpg-helper/models';

export class AuthRepositoryFirebaseAuth implements IAuthRepository {
  private auth = getAuth();

  async setUserClaims(uid: string, claims: TokenClaims): Promise<void> {
    return this.auth.setCustomUserClaims(uid, claims.toMap());
  }

  async createAuthUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserRecord> {
    return this.auth.createUser({
      email,
      password,
    });
  }

  async deleteAuthUser(uid: string): Promise<void> {
    return this.auth.deleteUser(uid);
  }
}
