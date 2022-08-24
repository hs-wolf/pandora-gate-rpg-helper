import {
  Character,
  CharacterUpdateBody,
} from '@pandora-gate-rpg-helper/models';

export interface ICharactersRepo {
  getCharactersByUserId(userId: string): Promise<Character[]>;

  getCharacterById(characterId: string): Promise<Character>;

  createCharacter(character: Character): Promise<Character>;

  updateCharacter(
    characterId: string,
    body: CharacterUpdateBody
  ): Promise<Character>;

  deleteCharacter(characterId: string): Promise<void>;
}
