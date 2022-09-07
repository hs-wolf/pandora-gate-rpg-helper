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
      character.guild = '';
      character.elements = [];
      character.jobs = [];
      character.attributes = {
        strength: 0,
        agility: 0,
        dexterity: 0,
        vitality: 0,
        spirit: 0,
        luck: 0,
      };
      character.basicData = {
        currentHP: 0,
        maxHP: 0,
        currentMP: 0,
        maxMP: 0,
        currentSP: 0,
        maxSP: 0,
        level: 0,
        exp: 0,
        next: 0,
        jp: 0,
        enhancements: 0,
        skillRegen: 0,
        currentHunger: 0,
        maxHunger: 0,
        gold: 0,
      };
      character.basicStats = {
        initiative: 0,
        dodge: 0,
        move: 0,
        critical: 0,
        physicalDefense: 0,
        physicalDice: 0,
        magicalDefense: 0,
        magicalDice: 0,
      };
      character.ranges = {
        unarmedRange: 0,
        meleeRange: 0,
        rangedRange: 0,
        fireWeaponRange: 0,
      };
      character.accuracies = {
        unarmedAccuracy: 0,
        meleeAccuracy: 0,
        rangedAccuracy: 0,
        fireWeaponAccuracy: 0,
      };
      character.physicalBonus = {
        unarmedBonus: 0,
        meleeBonus: 0,
        rangedBonus: 0,
        fireWeaponBonus: 0,
      };
      character.magicalBonus = {
        waterBonus: 0,
        etherealBonus: 0,
        fireBonus: 0,
        iceBonus: 0,
        moonBonus: 0,
        lightBonus: 0,
        magickBonus: 0,
        natureBonus: 0,
        sunBonus: 0,
        soulBonus: 0,
        earthBonus: 0,
        darkBonus: 0,
        thunderBonus: 0,
        windBonus: 0,
        astralBonus: 0,
      };
      character.fixedEffects = [];
      character.linkedEffects = [];
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
