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

export type Expertises = {
  expertiseMeleeWeapons: number;
  expertiseMechanicalWeapons: number;
  expertiseWillpower: number;
  expertiseForge: number;
  expertiseImmobilize: number;
  expertiseUnarmedFight: number;
  expertiseMine: number;
  expertiseMount: number;
  expertiseTrack: number;
  expertiseMislead: number;
  expertiseDisguise: number;
  expertiseDualWield: number;
  expertiseHide: number;
  expertiseDodge: number;
  expertiseEscape: number;
  expertiseJump: number;
  expertiseAgriculture: number;
  expertiseRangedWeapons: number;
  expertiseFireGuns: number;
  expertiseMasonry: number;
  expertiseThrowObject: number;
  expertiseClimb: number;
  expertiseMakeBoat: number;
  expertiseSwim: number;
  expertisePilot: number;
  expertisePrepareTrap: number;
  expertiseFirstAid: number;
  expertiseCharisma: number;
  expertisePhysicalDefense: number;
  expertiseLeadership: number;
  expertiseSurvival: number;
  expertiseCritical: number;
  expertisePlayCalculate: number;
  expertiseMagickFind: number;
  expertiseAid: number;
  expertiseBluff: number;
  expertiseConjuration: number;
  expertiseMagicDefense: number;
  expertiseWaterElement: number;
  expertiseEtherealElement: number;
  expertiseFireElement: number;
  expertiseIceElement: number;
  expertiseMoonElement: number;
  expertiseLightElement: number;
  expertiseMagickElement: number;
  expertiseNatureElement: number;
  expertiseSunElement: number;
  expertiseSoulElement: number;
  expertiseEarthElement: number;
  expertiseDarknessElement: number;
  expertiseThunderElement: number;
  expertiseWindElement: number;
  expertiseAstralElement: number;
  expertiseInterpretDreams: number;
  expertiseInterrogate: number;
  expertiseIntimidate: number;
  expertiseLanguage: number;
  expertiseCurse: number;
  expertiseMysticism: number;
  expertiseNegotiate: number;
  expertisePerception: number;
  expertiseForecastWeather: number;
  expertiseTactic: number;
  expertiseCombo: number;
  expertiseMVP: number;
  expertisePVP: number;
  expertiseSynergy: number;
  expertiseStunt: number;
  expertiseAstronomy: number;
  expertiseFaith: number;
  expertiseSteal: number;
  expertiseSpecialWeapon: number;
  expertiseChemistry: number;
  expertiseRelaxation: number;
};

export type FixedEffect = {
  target: string;
  operator: FixedOperators;
  value: number;
};

export type LinkedEffect = {
  target: EffectFieldsList;
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
  EXPERTISE_MELEE_WEAPONS = 'expertiseMeleeWeapons',
  EXPERTISE_MECHANICAL_WEAPONS = 'expertiseMechanicalWeapons',
  EXPERTISE_WILLPOWER = 'expertiseWillpower',
  EXPERTISE_FORGE = 'expertiseForge',
  EXPERTISE_IMMOBILIZE = 'expertiseImmobilize',
  EXPERTISE_UNARMED_FIGHT = 'expertiseUnarmedFight',
  EXPERTISE_MINE = 'expertiseMine',
  EXPERTISE_MOUNT = 'expertiseMount',
  EXPERTISE_TRACK = 'expertiseTrack',
  EXPERTISE_MISLEAD = 'expertiseMislead',
  EXPERTISE_DISGUISE = 'expertiseDisguise',
  EXPERTISE_DUALWIELD = 'expertiseDualWield',
  EXPERTISE_HIDE = 'expertiseHide',
  EXPERTISE_DODGE = 'expertiseDodge',
  EXPERTISE_ESCAPE = 'expertiseEscape',
  EXPERTISE_JUMP = 'expertiseJump',
  EXPERTISE_AGRICULTURE = 'expertiseAgriculture',
  EXPERTISE_RANGED_WEAPONS = 'expertiseRangedWeapons',
  EXPERTISE_FIREGUNS = 'expertiseFireGuns',
  EXPERTISE_MASONRY = 'expertiseMasonry',
  EXPERTISE_THROW_OBJECT = 'expertiseThrowObject',
  EXPERTISE_CLIMB = 'expertiseClimb',
  EXPERTISE_MAKEBOAT = 'expertiseMakeBoat',
  EXPERTISE_SWIM = 'expertiseSwim',
  EXPERTISE_PILOT = 'expertisePilot',
  EXPERTISE_PREPARE_TRAP = 'expertisePrepareTrap',
  EXPERTISE_FIRST_AID = 'expertiseFirstAid',
  EXPERTISE_CHARISMA = 'expertiseCharisma',
  EXPERTISE_PHYSICAL_DEFENSE = 'expertisePhysicalDefense',
  EXPERTISE_LEADERSHIP = 'expertiseLeadership',
  EXPERTISE_SURVIVAL = 'expertiseSurvival',
  EXPERTISE_CRITICAL = 'expertiseCritical',
  EXPERTISE_PLAY_CALCULATE = 'expertisePlayCalculate',
  EXPERTISE_MAGICK_FIND = 'expertiseMagickFind',
  EXPERTISE_AID = 'expertiseAid',
  EXPERTISE_BLUFF = 'expertiseBluff',
  EXPERTISE_CONJURATION = 'expertiseConjuration',
  EXPERTISE_MAGIC_DEFENSE = 'expertiseMagicDefense',
  EXPERTISE_WATER_ELEMENT = 'expertiseWaterElement',
  EXPERTISE_ETHEREAL_ELEMENT = 'expertiseEtherealElement',
  EXPERTISE_FIRE_ELEMENT = 'expertiseFireElement',
  EXPERTISE_ICE_ELEMENT = 'expertiseIceElement',
  EXPERTISE_MOON_ELEMENT = 'expertiseMoonElement',
  EXPERTISE_LIGHT_ELEMENT = 'expertiseLightElement',
  EXPERTISE_MAGICK_ELEMENT = 'expertiseMagickElement',
  EXPERTISE_NATURE_ELEMENT = 'expertiseNatureElement',
  EXPERTISE_SUN_ELEMENT = 'expertiseSunElement',
  EXPERTISE_SOUL_ELEMENT = 'expertiseSoulElement',
  EXPERTISE_EARTH_ELEMENT = 'expertiseEarthElement',
  EXPERTISE_DARKNESS_ELEMENT = 'expertiseDarknessElement',
  EXPERTISE_THUNDER_ELEMENT = 'expertiseThunderElement',
  EXPERTISE_WIND_ELEMENT = 'expertiseWindElement',
  EXPERTISE_ASTRAL_ELEMENT = 'expertiseAstralElement',
  EXPERTISE_INTERPRET_DREAMS = 'expertiseInterpretDreams',
  EXPERTISE_INTERROGATE = 'expertiseInterrogate',
  EXPERTISE_INTIMIDATE = 'expertiseIntimidate',
  EXPERTISE_LANGUAGE = 'expertiseLanguage',
  EXPERTISE_CURSE = 'expertiseCurse',
  EXPERTISE_MYSTICISM = 'expertiseMysticism',
  EXPERTISE_NEGOTIATE = 'expertiseNegotiate',
  EXPERTISE_PERCEPTION = 'expertisePerception',
  EXPERTISE_FORECAST_WEATHER = 'expertiseForecastWeather',
  EXPERTISE_TACTIC = 'expertiseTactic',
  EXPERTISE_COMBO = 'expertiseCombo',
  EXPERTISE_MVP = 'expertiseMVP',
  EXPERTISE_PVP = 'expertisePVP',
  EXPERTISE_SYNERGY = 'expertiseSynergy',
  EXPERTISE_STUNT = 'expertiseStunt',
  EXPERTISE_ASTRONOMY = 'expertiseAstronomy',
  EXPERTISE_FAITH = 'expertiseFaith',
  EXPERTISE_STEAL = 'expertiseSteal',
  EXPERTISE_SPECIAL_WEAPON = 'expertiseSpecialWeapon',
  EXPERTISE_CHEMISTRY = 'expertiseChemistry',
  EXPERTISE_RELAXATION = 'expertiseRelaxation',
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
