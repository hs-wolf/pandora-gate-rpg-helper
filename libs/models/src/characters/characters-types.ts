import { Character } from './characters-classes';

export type CharacterCreateBody = Partial<Pick<Character, 'ownerId' | 'name'>>;

export type CharacterUpdateBody = Partial<Omit<Character, 'id' | 'ownerId'>>;

export type BasicData = {
  basicDataCurrentHP: number;
  basicDataMaxHP: number;
  basicDataCurrentMP: number;
  basicDataMaxMP: number;
  basicDataCurrentSP: number;
  basicDataMaxSP: number;
  basicDataLevel: number;
  basicDataExp: number;
  basicDataNext: number;
  basicDataJP: number;
  basicDataEnhancements: number;
  basicDataSkillRegen: number;
  basicDataCurrentHunger: number;
  basicDataMaxHunger: number;
  basicDataGold: number;
};

export type Attributes = {
  attributeAgility: number;
  attributeDexterity: number;
  attributeLuck: number;
  attributeSpirit: number;
  attributeStrength: number;
  attributeVitality: number;
};

export type BasicStats = {
  basicStatInitiative: number;
  basicStatDodge: number;
  basicStatMove: number;
  basicStatCritical: number;
  basicStatPhysicalDefense: number;
  basicStatPhysicalDice: number;
  basicStatMagicalDefense: number;
  basicStatMagicalDice: number;
};

export type Ranges = {
  rangeUnarmed: number;
  rangeMeleeWeapon: number;
  rangeRangedWeapon: number;
  rangeFireWeapon: number;
};

export type Accuracies = {
  accuracyUnarmed: number;
  accuracyMeleeWeapon: number;
  accuracyRangedWeapon: number;
  accuracyFireWeapon: number;
};

export type PhysicalBonus = {
  bonusUnarmed: number;
  bonusMeleeWeapon: number;
  bonusRangedWeapon: number;
  bonusFireWeapon: number;
};

export type MagicalBonus = {
  bonusElementDark: number;
  bonusElementEarth: number;
  bonusElementEthereal: number;
  bonusElementFire: number;
  bonusElementIce: number;
  bonusElementLight: number;
  bonusElementMagick: number;
  bonusElementMoon: number;
  bonusElementNature: number;
  bonusElementSun: number;
  bonusElementThunder: number;
  bonusElementWater: number;
  bonusElementWind: number;
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
  expertiseFlee: number;
  expertiseJump: number;
  expertiseAgriculture: number;
  expertiseRangedWeapons: number;
  expertiseFireWeapons: number;
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
  expertiseSupport: number;
  expertiseBluff: number;
  expertiseConjuration: number;
  expertiseMagicalDefense: number;
  expertiseElementDark: number;
  expertiseElementEarth: number;
  expertiseElementEthereal: number;
  expertiseElementFire: number;
  expertiseElementIce: number;
  expertiseElementLight: number;
  expertiseElementMagick: number;
  expertiseElementMoon: number;
  expertiseElementNature: number;
  expertiseElementSun: number;
  expertiseElementThunder: number;
  expertiseElementWater: number;
  expertiseElementWind: number;
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
  expertiseAstronomy: number;
  expertiseChemistry: number;
  expertiseCombo: number;
  expertiseFaith: number;
  expertiseMVP: number;
  expertisePVP: number;
  expertiseRelaxation: number;
  expertiseSpecialWeapon: number;
  expertiseSteal: number;
  expertiseStunt: number;
  expertiseSynergy: number;
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

export enum EffectFieldsList {
  BASIC_DATA_CURRENT_HP = 'basicDataCurrentHP',
  BASIC_DATA_MAX_HP = 'basicDataMaxHP',
  BASIC_DATA_CURRENT_MP = 'basicDataCurrentMP',
  BASIC_DATA_MAX_MP = 'basicDataMaxMP',
  BASIC_DATA_CURRENT_SP = 'basicDataCurrentSP',
  BASIC_DATA_MAX_SP = 'basicDataMaxSP',
  BASIC_DATA_LEVEL = 'basicDataLevel',
  BASIC_DATA_GOLD = 'basicDataGold',
  ATTRIBUTE_AGILITY = 'attributeAgility',
  ATTRIBUTE_DEXTERITY = 'attributeDexterity',
  ATTRIBUTE_LUCK = 'attributeLuck',
  ATTRIBUTE_SPIRIT = 'attributeSpirit',
  ATTRIBUTE_STRENGTH = 'attributeStrength',
  ATTRIBUTE_VITALITY = 'attributeVitality',
  BASIC_STAT_INITIATIVE = 'basicStatInitiative',
  BASIC_STAT_DODGE = 'basicStatDodge',
  BASIC_STAT_MOVE = 'basicStatMove',
  BASIC_STAT_CRITICAL = 'basicStatCritical',
  BASIC_STAT_PHYSICAL_DEFENSE = 'basicStatPhysicalDefense',
  BASIC_STAT_PHYSICAL_DICE = 'basicStatPhysicalDice',
  BASIC_STAT_MAGICAL_DEFENSE = 'basicStatMagicalDefense',
  BASIC_STAT_MAGICAL_DICE = 'basicStatMagicalDice',
  RANGE_UNARMED = 'rangeUnarmed',
  RANGE_MELEE_WEAPON = 'rangeMeleeWeapon',
  RANGE_RANGED_WEAPON = 'rangeRangedWeapon',
  RANGE_FIRE_WEAPON = 'rangeFireWeapon',
  ACCURACY_UNARMED = 'accuracyUnarmed',
  ACCURACY_MELEE_WEAPON = 'accuracyMeleeWeapon',
  ACCURACY_RANGED_WEAPON = 'accuracyRangedWeapon',
  ACCURACY_FIRE_WEAPON = 'accuracyFireWeapon',
  BONUS_UNARMED = 'bonusUnarmed',
  BONUS_MELEE_WEAPON = 'bonusMeleeWeapon',
  BONUS_RANGED_WEAPON = 'bonusRangedWeapon',
  BONUS_FIRE_WEAPON = 'bonusFireWeapon',
  BONUS_ELEMENT_DARK = 'bonusElementDark',
  BONUS_ELEMENT_EARTH = 'bonusElementEarth',
  BONUS_ELEMENT_ETHEREAL = 'bonusElementEthereal',
  BONUS_ELEMENT_FIRE = 'bonusElementFire',
  BONUS_ELEMENT_ICE = 'bonusElementIce',
  BONUS_ELEMENT_LIGHT = 'bonusElementLight',
  BONUS_ELEMENT_MAGICK = 'bonusElementMagick',
  BONUS_ELEMENT_MOON = 'bonusElementMoon',
  BONUS_ELEMENT_NATURE = 'bonusElementNature',
  BONUS_ELEMENT_SUN = 'bonusElementSun',
  BONUS_ELEMENT_THUNDER = 'bonusElementThunder',
  BONUS_ELEMENT_WATER = 'bonusElementWater',
  BONUS_ELEMENT_WIND = 'bonusElementWind',
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
  EXPERTISE_DUAL_WIELD = 'expertiseDualWield',
  EXPERTISE_HIDE = 'expertiseHide',
  EXPERTISE_DODGE = 'expertiseDodge',
  EXPERTISE_FLEE = 'expertiseFlee',
  EXPERTISE_JUMP = 'expertiseJump',
  EXPERTISE_AGRICULTURE = 'expertiseAgriculture',
  EXPERTISE_RANGED_WEAPONS = 'expertiseRangedWeapons',
  EXPERTISE_FIRE_WEAPONS = 'expertiseFireWeapons',
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
  EXPERTISE_SUPPORT = 'expertiseSupport',
  EXPERTISE_BLUFF = 'expertiseBluff',
  EXPERTISE_CONJURATION = 'expertiseConjuration',
  EXPERTISE_MAGICAL_DEFENSE = 'expertiseMagicalDefense',
  EXPERTISE_ELEMENT_DARK = 'expertiseElementDark',
  EXPERTISE_ELEMENT_EARTH = 'expertiseElementEarth',
  EXPERTISE_ELEMENT_ETHEREAL = 'expertiseElementEthereal',
  EXPERTISE_ELEMENT_FIRE = 'expertiseElementFire',
  EXPERTISE_ELEMENT_ICE = 'expertiseElementIce',
  EXPERTISE_ELEMENT_LIGHT = 'expertiseElementLight',
  EXPERTISE_ELEMENT_MAGICK = 'expertiseElementMagick',
  EXPERTISE_ELEMENT_MOON = 'expertiseElementMoon',
  EXPERTISE_ELEMENT_NATURE = 'expertiseElementNature',
  EXPERTISE_ELEMENT_SUN = 'expertiseElementSun',
  EXPERTISE_ELEMENT_THUNDER = 'expertiseElementThunder',
  EXPERTISE_ELEMENT_WATER = 'expertiseElementWater',
  EXPERTISE_ELEMENT_WIND = 'expertiseElementWind',
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
  EXPERTISE_ASTRONOMY = 'expertiseAstronomy',
  EXPERTISE_CHEMISTRY = 'expertiseChemistry',
  EXPERTISE_COMBO = 'expertiseCombo',
  EXPERTISE_FAITH = 'expertiseFaith',
  EXPERTISE_MVP = 'expertiseMVP',
  EXPERTISE_PVP = 'expertisePVP',
  EXPERTISE_RELAXATION = 'expertiseRelaxation',
  EXPERTISE_SPECIAL_WEAPON = 'expertiseSpecialWeapon',
  EXPERTISE_STEAL = 'expertiseSteal',
  EXPERTISE_STUNT = 'expertiseStunt',
  EXPERTISE_SYNERGY = 'expertiseSynergy',
}
