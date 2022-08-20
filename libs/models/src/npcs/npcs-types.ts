import { Npc } from './npcs-classes';

export type NpcUpdateBody = Partial<Omit<Npc, 'id'>>;
