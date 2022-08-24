import { Character } from './characters-classes';

export type CharacterCreateBody = Partial<Pick<Character, 'ownerId' | 'name'>>;

export type CharacterUpdateBody = Partial<Omit<Character, 'id' | 'ownerId'>>;
