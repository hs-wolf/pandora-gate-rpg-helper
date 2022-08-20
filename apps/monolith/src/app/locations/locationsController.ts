import {
  Controller,
  Get,
  Route,
  Tags,
  Path,
  Delete,
  Put,
  Body,
  Post,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { LocationsService } from './locationsService';
import { Location, LocationUpdateBody } from '@pandora-gate-rpg-helper/models';

@Tags('Locations Service')
@Route('/locations')
export class LocationsController extends Controller {
  @Inject
  private service: LocationsService;

  @Get('/{locationId}')
  public async getLocationById(@Path() locationId: string): Promise<Location> {
    return this.service.getLocationById(locationId);
  }

  @Post('/')
  public createLocation(@Body() body: Location): Promise<void> {
    return this.service.createLocation(body);
  }

  @Put('/{locationId}')
  public updateLocation(
    @Path() locationId: string,
    @Body() body: LocationUpdateBody
  ): Promise<void> {
    return this.service.updateLocation(locationId, body);
  }

  @Delete('/{locationId}')
  public deleteLocation(@Path() locationId: string): Promise<void> {
    return this.service.deleteLocation(locationId);
  }
}
