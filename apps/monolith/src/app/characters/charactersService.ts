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
      character.basicData = {
        basicDataCurrentHP: 0,
        basicDataMaxHP: 0,
        basicDataCurrentMP: 0,
        basicDataMaxMP: 0,
        basicDataCurrentSP: 0,
        basicDataMaxSP: 0,
        basicDataLevel: 0,
        basicDataExp: 0,
        basicDataNext: 0,
        basicDataJP: 0,
        basicDataEnhancements: 0,
        basicDataSkillRegen: 0,
        basicDataCurrentHunger: 0,
        basicDataMaxHunger: 0,
        basicDataGold: 0,
      };
      character.attributes = {
        attributeAgility: 0,
        attributeDexterity: 0,
        attributeLuck: 0,
        attributeSpirit: 0,
        attributeStrength: 0,
        attributeVitality: 0,
      };
      character.basicStats = {
        basicStatInitiative: 0,
        basicStatDodge: 0,
        basicStatMove: 0,
        basicStatCritical: 0,
        basicStatPhysicalDefense: 0,
        basicStatPhysicalDice: 0,
        basicStatMagicalDefense: 0,
        basicStatMagicalDice: 0,
      };
      character.ranges = {
        rangeUnarmed: 0,
        rangeMeleeWeapon: 0,
        rangeRangedWeapon: 0,
        rangeFireWeapon: 0,
      };
      character.accuracies = {
        accuracyUnarmed: 0,
        accuracyMeleeWeapon: 0,
        accuracyRangedWeapon: 0,
        accuracyFireWeapon: 0,
      };
      character.physicalBonus = {
        bonusUnarmed: 0,
        bonusMeleeWeapon: 0,
        bonusRangedWeapon: 0,
        bonusFireWeapon: 0,
      };
      character.magicalBonus = {
        bonusElementDark: 0,
        bonusElementEarth: 0,
        bonusElementEthereal: 0,
        bonusElementFire: 0,
        bonusElementIce: 0,
        bonusElementLight: 0,
        bonusElementMagick: 0,
        bonusElementMoon: 0,
        bonusElementNature: 0,
        bonusElementSun: 0,
        bonusElementThunder: 0,
        bonusElementWater: 0,
        bonusElementWind: 0,
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
        expertiseFlee: 0,
        expertiseJump: 0,
        expertiseAgriculture: 0,
        expertiseRangedWeapons: 0,
        expertiseFireWeapons: 0,
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
        expertiseSupport: 0,
        expertiseBluff: 0,
        expertiseConjuration: 0,
        expertiseMagicalDefense: 0,
        expertiseElementDark: 0,
        expertiseElementEarth: 0,
        expertiseElementEthereal: 0,
        expertiseElementFire: 0,
        expertiseElementIce: 0,
        expertiseElementLight: 0,
        expertiseElementMagick: 0,
        expertiseElementMoon: 0,
        expertiseElementNature: 0,
        expertiseElementSun: 0,
        expertiseElementThunder: 0,
        expertiseElementWater: 0,
        expertiseElementWind: 0,
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
        expertiseAstronomy: 0,
        expertiseChemistry: 0,
        expertiseCombo: 0,
        expertiseFaith: 0,
        expertiseMVP: 0,
        expertisePVP: 0,
        expertiseRelaxation: 0,
        expertiseSpecialWeapon: 0,
        expertiseSteal: 0,
        expertiseStunt: 0,
        expertiseSynergy: 0,
      };
      character.fixedEffects = [];
      character.linkedEffects = [];
      character.percentageEffects = [];
      character.fixedFormulas = [
        {
          target: EffectFieldsList.BASIC_STAT_MOVE,
          operator: FixedOperators.SUM,
          value: 2,
        },
      ];
      character.linkedFormulas = [
        {
          target: EffectFieldsList.BASIC_STAT_INITIATIVE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BASIC_STAT_DODGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BASIC_STAT_CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BASIC_STAT_CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_CRITICAL,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BASIC_STAT_PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BASIC_STAT_PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_PHYSICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BASIC_STAT_PHYSICAL_DICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.BASIC_STAT_PHYSICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.BASIC_STAT_MAGICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BASIC_STAT_MAGICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MAGICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BASIC_STAT_MAGICAL_DICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.BASIC_STAT_MAGICAL_DEFENSE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 3,
        },
        {
          target: EffectFieldsList.RANGE_RANGED_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 25,
        },
        {
          target: EffectFieldsList.RANGE_FIRE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIRE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 25,
        },
        {
          target: EffectFieldsList.ACCURACY_UNARMED,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.ACCURACY_UNARMED,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.ACCURACY_MELEE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.ACCURACY_MELEE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.ACCURACY_RANGED_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.ACCURACY_RANGED_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.ACCURACY_FIRE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.ACCURACY_FIRE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIRE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 5,
        },
        {
          target: EffectFieldsList.BONUS_UNARMED,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BONUS_UNARMED,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BONUS_MELEE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BONUS_MELEE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BONUS_RANGED_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BONUS_RANGED_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BONUS_FIRE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.BONUS_FIRE_WEAPON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_FIRE_WEAPONS,
          fieldOperator: LinkedOperators.DIVISION,
          value: 10,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_DARK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_DARK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_EARTH,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_EARTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_ETHEREAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_ETHEREAL,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_FIRE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_FIRE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_ICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_ICE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_LIGHT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_LIGHT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_MAGICK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_MAGICK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_MOON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_MOON,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_NATURE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_NATURE,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_SUN,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_SUN,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_THUNDER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_THUNDER,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_WATER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_WATER,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.BONUS_ELEMENT_WIND,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.EXPERTISE_ELEMENT_WIND,
          fieldOperator: LinkedOperators.DIVISION,
          value: 7,
        },
        {
          target: EffectFieldsList.EXPERTISE_MELEE_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MECHANICAL_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_WILLPOWER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_FORGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_IMMOBILIZE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_UNARMED_FIGHT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MINE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MOUNT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_TRACK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_STRENGTH,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MISLEAD,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_DISGUISE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_DUAL_WIELD,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_HIDE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_DODGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_FLEE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_JUMP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_AGRICULTURE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_RANGED_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_FIRE_WEAPONS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MASONRY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_THROW_OBJECT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CLIMB,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAKEBOAT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_SWIM,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_PILOT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_PREPARE_TRAP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_FIRST_AID,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CHARISMA,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_PHYSICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_LEADERSHIP,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_SURVIVAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CRITICAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_PLAY_CALCULATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAGICK_FIND,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_SUPPORT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_BLUFF,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CONJURATION,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MAGICAL_DEFENSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_DARK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_EARTH,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_ETHEREAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_FIRE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_ICE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_LIGHT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_MAGICK,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_MOON,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_NATURE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_SUN,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_THUNDER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_WATER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_ELEMENT_WIND,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTERPRET_DREAMS,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTERROGATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_INTIMIDATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_LANGUAGE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CURSE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_MYSTICISM,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_NEGOTIATE,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_PERCEPTION,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_FORECAST_WEATHER,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_TACTIC,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_STUNT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_STUNT,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_STEAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_AGILITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_STEAL,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_DEXTERITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_RELAXATION,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_VITALITY,
          fieldOperator: LinkedOperators.DIVISION,
          value: 2,
        },
        {
          target: EffectFieldsList.EXPERTISE_CHEMISTRY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_LUCK,
          fieldOperator: LinkedOperators.DIVISION,
          value: 4,
        },
        {
          target: EffectFieldsList.EXPERTISE_CHEMISTRY,
          targetOperator: FixedOperators.SUM,
          field: EffectFieldsList.ATTRIBUTE_SPIRIT,
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
