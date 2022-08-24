import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_COLLECTION_CHARACTERS } from '../../../constants';
import { ICharactersRepo } from './ICharactersRepo';
import {
  Character,
  CharacterUpdateBody,
} from '@pandora-gate-rpg-helper/models';

export class CharactersRepoFirestore implements ICharactersRepo {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_CHARACTERS);

  async getCharactersByUserId(userId: string): Promise<Character[]> {
    const querySnapshot = await this.collRef
      .where('ownerId', '==', userId)
      .get();
    return querySnapshot.docs.map((doc) => Character.fromFirestore(doc));
  }

  async getCharacterById(characterId: string): Promise<Character> {
    const snapshot = await this.collRef.doc(characterId).get();
    return Character.fromFirestore(snapshot);
  }

  async createCharacter(character: Character): Promise<Character> {
    if (character.id) {
      await this.collRef.doc(character.id).set(character.toMap());
      return Character.fromMap(character);
    }
    const newCharacter = await (
      await this.collRef.add(character.toMap())
    ).get();
    return Character.fromFirestore(newCharacter);
  }

  async updateCharacter(
    characterId: string,
    body: CharacterUpdateBody
  ): Promise<Character> {
    await this.collRef.doc(characterId).update(body);
    return Character.fromFirestore(await this.collRef.doc(characterId).get());
  }

  async deleteCharacter(characterId: string): Promise<void> {
    await this.collRef.doc(characterId).delete();
  }
}
