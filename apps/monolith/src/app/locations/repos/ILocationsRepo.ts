import { Location, LocationUpdateBody } from '@pandora-gate-rpg-helper/models';

export interface ILocationsRepo {
  getLocationById(locationId: string): Promise<Location>;

  createLocation(location: Location): Promise<Location>;

  updateLocation(locationId: string, body: LocationUpdateBody): Promise<void>;

  deleteLocation(locationId: string): Promise<void>;
}
