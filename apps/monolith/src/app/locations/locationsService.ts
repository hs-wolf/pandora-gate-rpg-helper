import { ILocationsRepo } from './repos/ILocationsRepo';
import { LocationsRepoFirestore } from './repos/locationsRepoFirestore';
import {
  ApiError,
  ResponseCodes,
  Location,
  LocationUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class LocationsService {
  private _locationsRepo: ILocationsRepo;

  constructor(locationsRepo?: ILocationsRepo) {
    this._locationsRepo = locationsRepo ?? new LocationsRepoFirestore();
  }

  async getLocationById(locationId: string): Promise<Location> {
    try {
      const location = await this._locationsRepo.getLocationById(locationId);
      if (!location) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find location with locationId: ${locationId}.`
        );
      }
      return location;
    } catch (error) {
      handleError(error);
    }
  }

  async createLocation(location: Location): Promise<void> {
    try {
      await this._locationsRepo.createLocation(location);
    } catch (error) {
      handleError(error);
    }
  }

  async updateLocation(
    locationId: string,
    body: LocationUpdateBody
  ): Promise<void> {
    try {
      await this._locationsRepo.updateLocation(locationId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteLocation(locationId: string): Promise<void> {
    try {
      await this._locationsRepo.deleteLocation(locationId);
    } catch (error) {
      handleError(error);
    }
  }
}
