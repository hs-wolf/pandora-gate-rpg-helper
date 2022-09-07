import { Character } from './characters-classes';

export type CharacterCreateBody = Partial<Pick<Character, 'ownerId' | 'name'>>;

export type CharacterUpdateBody = Partial<Omit<Character, 'id' | 'ownerId'>>;

export type BasicData = {
  currentHP: number;
  maxHP: number;
  currentMP: number;
  maxMP: number;
  currentSP: number;
  maxSP: number;
  level: number;
  exp: number;
  next: number;
  jp: number;
  enhancements: number;
  skillRegen: number;
  currentHunger: number;
  maxHunger: number;
  gold: number;
};

export type Attributes = {
  strength: number;
  agility: number;
  dexterity: number;
  vitality: number;
  spirit: number;
  luck: number;
};

export type BasicStats = {
  initiative: number;
  dodge: number;
  move: number;
  critical: number;
  physicalDefense: number;
  physicalDice: number;
  magicalDefense: number;
  magicalDice: number;
};

export type Ranges = {
  unarmedRange: number;
  meleeRange: number;
  rangedRange: number;
  fireWeaponRange: number;
};

export type Accuracies = {
  unarmedAccuracy: number;
  meleeAccuracy: number;
  rangedAccuracy: number;
  fireWeaponAccuracy: number;
};

export type PhysicalBonus = {
  unarmedBonus: number;
  meleeBonus: number;
  rangedBonus: number;
  fireWeaponBonus: number;
};

export type MagicalBonus = {
  waterBonus: number;
  etherealBonus: number;
  fireBonus: number;
  iceBonus: number;
  moonBonus: number;
  lightBonus: number;
  magickBonus: number;
  natureBonus: number;
  sunBonus: number;
  soulBonus: number;
  earthBonus: number;
  darkBonus: number;
  thunderBonus: number;
  windBonus: number;
  astralBonus: number;
};

export type FixedEffect = {
  target: string;
  operator: FixedOperators;
  value: number;
};

export type LinkedEffect = {
  target: string;
  targetOperator: FixedOperators;
  field: EffectFieldsList;
  fieldOperator: LinkedOperators;
  value: number;
};

export type PercentageEffect = {
  target: string;
  operator: PercentageOperators;
  value: number;
};

export enum EffectFieldsList {
  CURRENT_HP = 'currentHP',
  MAX_HP = 'maxHP',
  CURRENT_MP = 'currentMP',
  MAX_MP = 'maxMP',
  CURRENT_SP = 'currentSP',
  MAX_SP = 'maxSP',
  LEVEL = 'level',
  STRENGTH = 'strength',
  AGILITY = 'agility',
  DEXTERITY = 'dexterity',
  VITALITY = 'vitality',
  SPIRIT = 'spirit',
  LUCK = 'luck',
  INITIATIVE = 'initiative',
  DODGE = 'dodge',
  MOVE = 'move',
  CRITICAL = 'critical',
  PHYSICAL_DEFENSE = 'physicalDefense',
  PHYSICAL_DICE = 'physicalDice',
  MAGICAL_DEFENSE = 'magicalDefense',
  MAGICAL_DICE = 'magicalDice',
  UNARMED_RANGE = 'unarmedRange',
  MELEE_RANGE = 'meleeRange',
  RANGED_RANGE = 'rangedRange',
  FIRE_WEAPON_RANGE = 'fireWeaponRange',
  UNARMED_ACCURACY = 'unarmedAccuracy',
  MELEE_ACCURACY = 'meleeAccuracy',
  RANGED_ACCURACY = 'rangedAccuracy',
  FIRE_WEAPON_ACCURACY = 'fireWeaponAccuracy',
  UNARMED_BONUS = 'unarmedBonus',
  MELEE_BONUS = 'meleeBonus',
  RANGED_BONUS = 'rangedBonus',
  FIRE_WEAPON_BONUS = 'fireWeaponBonus',
  WATER_BONUS = 'waterBonus',
  ETHEREAL_BONUS = 'etherealBonus',
  FIRE_BONUS = 'fireBonus',
  ICE_BONUS = 'iceBonus',
  MOON_BONUS = 'moonBonus',
  LIGHT_BONUS = 'lightBonus',
  MAGICK_BONUS = 'magickBonus',
  NATURE_BONUS = 'natureBonus',
  SUN_BONUS = 'sunBonus',
  SOUL_BONUS = 'soulBonus',
  EARTH_BONUS = 'earthBonus',
  DARK_BONUS = 'darkBonus',
  THUNDER_BONUS = 'thunderBonus',
  WIND_BONUS = 'windBonus',
  ASTRAL_BONUS = 'astralBonus',
}

export enum FixedOperators {
  SUM = 'SUM',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
}

export enum LinkedOperators {
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
}

export enum PercentageOperators {
  SUM = 'SUM',
  SUBTRACTION = 'SUBTRACTION',
}
