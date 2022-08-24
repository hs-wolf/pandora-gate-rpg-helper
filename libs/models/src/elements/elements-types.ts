import { Element } from './elements-classes';

export type ElementCreateBody = Partial<Omit<Element, 'id'>>;

export type ElementUpdateBody = Partial<Omit<Element, 'id'>>;
