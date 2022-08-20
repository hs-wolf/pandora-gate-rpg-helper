import { Npc, NpcUpdateBody } from '@pandora-gate-rpg-helper/models';

export interface INpcsRepo {
  getNpcById(npcId: string): Promise<Npc>;

  createNpc(npc: Npc): Promise<Npc>;

  updateNpc(npcId: string, body: NpcUpdateBody): Promise<void>;

  deleteNpc(npcId: string): Promise<void>;
}
