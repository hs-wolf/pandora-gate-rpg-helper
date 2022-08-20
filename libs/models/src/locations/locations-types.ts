import { Location } from './locations-classes';

export type LocationUpdateBody = Partial<Omit<Location, 'id'>>;
