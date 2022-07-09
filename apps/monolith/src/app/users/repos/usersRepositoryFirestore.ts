import { getFirestore } from 'firebase-admin/firestore';
import { IUsersRepository } from './usersRepositoryInterface';
import { FIREBASE_COLLECTION_USERS } from '../../../constants';
import { User, UserUpdateBody } from '@pandora-gate-rpg-helper/models';

export class UsersRepositoryFirestore implements IUsersRepository {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_USERS);

  async getUserById(userId: string): Promise<User> {
    const snapshot = await this.collRef.doc(userId).get();
    return User.fromFirestore(snapshot);
  }

  async createUser(user: User): Promise<User> {
    await this.collRef.doc(user.id).set(user.toMap());
    return User.fromMap(user);
  }

  async updateUser(userId: string, body: UserUpdateBody): Promise<void> {
    await this.collRef.doc(userId).update(body);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.collRef.doc(userId).delete();
  }
}
