import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_COLLECTION_LOCATIONS } from '../../../constants';
import { ILocationsRepo } from './ILocationsRepo';
import { Location, LocationUpdateBody } from '@pandora-gate-rpg-helper/models';

export class LocationsRepoFirestore implements ILocationsRepo {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_LOCATIONS);

  async getLocationById(locationId: string): Promise<Location> {
    const snapshot = await this.collRef.doc(locationId).get();
    return Location.fromFirestore(snapshot);
  }

  async createLocation(location: Location): Promise<Location> {
    await this.collRef.doc(location.id).set(location.toMap());
    return Location.fromMap(location);
  }

  async updateLocation(
    locationId: string,
    body: LocationUpdateBody
  ): Promise<void> {
    await this.collRef.doc(locationId).update(body);
  }

  async deleteLocation(locationId: string): Promise<void> {
    await this.collRef.doc(locationId).delete();
  }
}
