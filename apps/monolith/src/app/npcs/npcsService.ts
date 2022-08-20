import { INpcsRepo } from './repos/INpcsRepo';
import { NpcsRepoFirestore } from './repos/npcsRepoFirestore';
import {
  ApiError,
  ResponseCodes,
  Npc,
  NpcUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class NpcsService {
  private _npcsRepo: INpcsRepo;

  constructor(npcsRepo?: INpcsRepo) {
    this._npcsRepo = npcsRepo ?? new NpcsRepoFirestore();
  }

  async getNpcById(npcId: string): Promise<Npc> {
    try {
      const npc = await this._npcsRepo.getNpcById(npcId);
      if (!npc) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find npc with npcId: ${npcId}.`
        );
      }
      return npc;
    } catch (error) {
      handleError(error);
    }
  }

  async createNpc(npc: Npc): Promise<void> {
    try {
      await this._npcsRepo.createNpc(npc);
    } catch (error) {
      handleError(error);
    }
  }

  async updateNpc(npcId: string, body: NpcUpdateBody): Promise<void> {
    try {
      await this._npcsRepo.updateNpc(npcId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteNpc(npcId: string): Promise<void> {
    try {
      await this._npcsRepo.deleteNpc(npcId);
    } catch (error) {
      handleError(error);
    }
  }
}
