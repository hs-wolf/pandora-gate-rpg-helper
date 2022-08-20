import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_COLLECTION_NPCS } from '../../../constants';
import { INpcsRepo } from './INpcsRepo';
import { Npc, NpcUpdateBody } from '@pandora-gate-rpg-helper/models';

export class NpcsRepoFirestore implements INpcsRepo {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_NPCS);

  async getNpcById(npcId: string): Promise<Npc> {
    const snapshot = await this.collRef.doc(npcId).get();
    return Npc.fromFirestore(snapshot);
  }

  async createNpc(npc: Npc): Promise<Npc> {
    await this.collRef.doc(npc.id).set(npc.toMap());
    return Npc.fromMap(npc);
  }

  async updateNpc(npcId: string, body: NpcUpdateBody): Promise<void> {
    await this.collRef.doc(npcId).update(body);
  }

  async deleteNpc(npcId: string): Promise<void> {
    await this.collRef.doc(npcId).delete();
  }
}
