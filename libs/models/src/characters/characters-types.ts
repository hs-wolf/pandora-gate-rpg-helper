import { Character } from './characters-classes';

export type CharacterCreateBody = Partial<Pick<Character, 'ownerId' | 'name'>>;

export type CharacterUpdateBody = Partial<Omit<Character, 'id' | 'ownerId'>>;

export type Exp = { current: number; next: number };

export type Hunger = { current: number; max: number };

export type Attributes = {
  strength: number;
  agility: number;
  dexterity: number;
  vitality: number;
  spirit: number;
  luck: number;
};

export type FixedEffect = {
  field: string;
  operator: FixedOperators;
  value: number;
};

export type PercentageEffect = {
  field: string;
  operator: PercentageOperators;
  value: number;
};

export enum EffectFieldsList {
  STRENGTH = 'strength',
  AGILITY = 'agility',
  DEXTERITY = 'dexterity',
  VITALITY = 'vitality',
  SPIRIT = 'spirit',
  LUCK = 'luck',
}

export enum FixedOperators {
  SUM = 'SUM',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
}

export enum PercentageOperators {
  SUM = 'SUM',
  SUBTRACTION = 'SUBTRACTION',
}
