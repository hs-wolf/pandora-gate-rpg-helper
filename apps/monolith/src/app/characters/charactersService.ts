import { ICharactersRepo } from './repos/ICharactersRepo';
import { CharactersRepoFirestore } from './repos/charactersRepoFirestore';
import {
  ApiError,
  ResponseCodes,
  Character,
  CharacterUpdateBody,
  CharacterCreateBody,
  EffectFieldsList,
  FixedOperators,
  LinkedOperators,
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
      character.expertises = {
        expertiseMeleeWeapons: 0,
        expertiseMechanicalWeapons: 0,
        expertiseWillpower: 0,
        expertiseForge: 0,
        expertiseImmobilize: 0,
        expertiseUnarmedFight: 0,
        expertiseMine: 0,
        expertiseMount: 0,
        expertiseTrack: 0,
        expertiseMislead: 0,
        expertiseDisguise: 0,
        expertiseDualWield: 0,
        expertiseHide: 0,
        expertiseDodge: 0,
        expertiseEscape: 0,
        expertiseJump: 0,
        expertiseAgriculture: 0,
        expertiseRangedWeapons: 0,
        expertiseFireGuns: 0,
        expertiseMasonry: 0,
        expertiseThrowObject: 0,
        expertiseClimb: 0,
        expertiseMakeBoat: 0,
        expertiseSwim: 0,
        expertisePilot: 0,
        expertisePrepareTrap: 0,
        expertiseFirstAid: 0,
        expertiseCharisma: 0,
        expertisePhysicalDefense: 0,
        expertiseLeadership: 0,
        expertiseSurvival: 0,
        expertiseCritical: 0,
        expertisePlayCalculate: 0,
        expertiseMagickFind: 0,
        expertiseAid: 0,
        expertiseBluff: 0,
        expertiseConjuration: 0,
        expertiseMagicDefense: 0,
        expertiseWaterElement: 0,
        expertiseEtherealElement: 0,
        expertiseFireElement: 0,
        expertiseIceElement: 0,
        expertiseMoonElement: 0,
        expertiseLightElement: 0,
        expertiseMagickElement: 0,
        expertiseNatureElement: 0,
        expertiseSunElement: 0,
        expertiseSoulElement: 0,
        expertiseEarthElement: 0,
        expertiseDarknessElement: 0,
        expertiseThunderElement: 0,
        expertiseWindElement: 0,
        expertiseAstralElement: 0,
        expertiseInterpretDreams: 0,
        expertiseInterrogate: 0,
        expertiseIntimidate: 0,
        expertiseLanguage: 0,
        expertiseCurse: 0,
        expertiseMysticism: 0,
        expertiseNegotiate: 0,
        expertisePerception: 0,
        expertiseForecastWeather: 0,
        expertiseTactic: 0,
        expertiseCombo: 0,
        expertiseMVP: 0,
        expertisePVP: 0,
        expertiseSynergy: 0,
        expertiseStunt: 0,
        expertiseAstronomy: 0,
        expertiseFaith: 0,
        expertiseSteal: 0,
        expertiseSpecialWeapon: 0,
        expertiseChemistry: 0,
        expertiseRelaxation: 0,
      };
      character.fixedEffects = [];
      character.linkedEffects = [];
      character.percentageEffects = [];
      character.fixedFormulas = [
        {
          target: EffectFieldsList.MOVE,
          operator: FixedOperators.SUM,
          value: 2,
        },
      ];
      character.linkedFormulas = [
        {
          target: EffectFieldsList.INITIATIVE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.DODGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_CRITICAL,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_PHYSICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.PHYSICAL_DICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.PHYSICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.MAGICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.MAGICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MAGIC_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.PHYSICAL_DICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.MAGICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 3,
        },
        {
          target: EffectFieldsList.RANGED_RANGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 25,
        },
        {
          target: EffectFieldsList.FIRE_WEAPON_RANGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIREGUNS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 25,
        },
        {
          target: EffectFieldsList.UNARMED_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.UNARMED_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.MELEE_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.MELEE_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.RANGED_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.RANGED_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.FIRE_WEAPON_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.FIRE_WEAPON_ACCURACY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIREGUNS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.UNARMED_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.UNARMED_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.MELEE_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.MELEE_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.RANGED_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.RANGED_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.FIRE_WEAPON_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.FIRE_WEAPON_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIREGUNS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.WATER_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_WATER_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.ETHEREAL_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ETHEREAL_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.FIRE_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIRE_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.ICE_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ICE_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.MOON_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MOON_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.LIGHT_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_LIGHT_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.MAGICK_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MAGICK_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.NATURE_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_NATURE_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.SUN_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_SUN_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.SOUL_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_SOUL_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.EARTH_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_EARTH_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.DARK_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_DARKNESS_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.THUNDER_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_THUNDER_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.WIND_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_WIND_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.ASTRAL_BONUS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ASTRAL_ELEMENT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MECHANICAL_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_WILLPOWER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_FORGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_IMMOBILIZE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MINE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MOUNT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_TRACK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MISLEAD,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_DISGUISE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_DUALWIELD,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_HIDE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_DODGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_ESCAPE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_JUMP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_AGRICULTURE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_FIREGUNS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MASONRY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_THROW_OBJECT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CLIMB,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAKEBOAT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_SWIM,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_PILOT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_PREPARE_TRAP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_FIRST_AID,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CHARISMA,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_LEADERSHIP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_SURVIVAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_PLAY_CALCULATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAGICK_FIND,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_AID,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_BLUFF,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CONJURATION,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAGIC_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_WATER_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_ETHEREAL_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_FIRE_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_ICE_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MOON_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_LIGHT_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAGICK_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_NATURE_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_SUN_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_SOUL_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_EARTH_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_DARKNESS_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_THUNDER_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_WIND_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_ASTRAL_ELEMENT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTERPRET_DREAMS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTERROGATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTIMIDATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_LANGUAGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CURSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_MYSTICISM,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_NEGOTIATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_PERCEPTION,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_FORECAST_WEATHER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_TACTIC,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
      ];
      character.percentageFormulas = [];
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
