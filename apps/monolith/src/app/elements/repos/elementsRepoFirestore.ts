import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_COLLECTION_ELEMENTS } from '../../../constants';
import { IElementsRepo } from './IElementsRepo';
import { Element, ElementUpdateBody } from '@pandora-gate-rpg-helper/models';

export class ElementsRepoFirestore implements IElementsRepo {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_ELEMENTS);

  async getAllElements(): Promise<Element[]> {
    const querySnapshot = await this.collRef.get();
    return querySnapshot.docs.map((doc) => Element.fromFirestore(doc));
  }

  async getElementById(elementId: string): Promise<Element> {
    const snapshot = await this.collRef.doc(elementId).get();
    return Element.fromFirestore(snapshot);
  }

  async createElement(element: Element): Promise<Element> {
    if (element.id) {
      await this.collRef.doc(element.id).set(element.toMap());
      return Element.fromMap(element);
    }
    const newElement = await (await this.collRef.add(element.toMap())).get();
    return Element.fromFirestore(newElement);
  }

  async updateElement(
    elementId: string,
    body: ElementUpdateBody
  ): Promise<Element> {
    await this.collRef.doc(elementId).update(body);
    return Element.fromFirestore(await this.collRef.doc(elementId).get());
  }

  async deleteElement(elementId: string): Promise<void> {
    await this.collRef.doc(elementId).delete();
  }
}
