import { ICharactersRepo } from './repos/ICharactersRepo';
import { CharactersRepoFirestore } from './repos/charactersRepoFirestore';
import {
  ApiError,
  ResponseCodes,
  Character,
  CharacterUpdateBody,
  CharacterCreateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class CharactersService {
  private _charactersRepo: ICharactersRepo;

  constructor(charactersRepo?: ICharactersRepo) {
    this._charactersRepo = charactersRepo ?? new CharactersRepoFirestore();
  }

  async getCharactersByUserId(userId: string): Promise<Character[]> {
    try {
      const character = await this._charactersRepo.getCharactersByUserId(
        userId
      );
      if (!character.length) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find characters with ownerId: ${userId}.`
        );
      }
      return character;
    } catch (error) {
      handleError(error);
    }
  }

  async getCharacterById(characterId: string): Promise<Character> {
    try {
      const character = await this._charactersRepo.getCharacterById(
        characterId
      );
      if (!character) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find character with characterId: ${characterId}.`
        );
      }
      return character;
    } catch (error) {
      handleError(error);
    }
  }

  async createCharacter(body: CharacterCreateBody): Promise<Character> {
    try {
      const character = Character.fromMap(body);
      character.attributes = {
        strength: 0,
        agility: 0,
        dexterity: 0,
        vitality: 0,
        spirit: 0,
        luck: 0,
      };
      character.fixedEffects = [];
      character.percentageEffects = [];
      return await this._charactersRepo.createCharacter(character);
    } catch (error) {
      handleError(error);
    }
  }

  async updateCharacter(
    characterId: string,
    body: CharacterUpdateBody
  ): Promise<Character> {
    try {
      return await this._charactersRepo.updateCharacter(characterId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteCharacter(characterId: string): Promise<void> {
    try {
      await this._charactersRepo.deleteCharacter(characterId);
    } catch (error) {
      handleError(error);
    }
  }
}
