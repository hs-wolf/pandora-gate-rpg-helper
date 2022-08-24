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
import { ElementsService } from './elementsService';
import {
  Element,
  ElementCreateBody,
  ElementUpdateBody,
} from '@pandora-gate-rpg-helper/models';

@Tags('Elements Service')
@Route('/elements')
export class ElementsController extends Controller {
  @Inject
  private service: ElementsService;

  @Get('/')
  public async getAllElements(): Promise<Element[]> {
    return this.service.getAllElements();
  }

  @Get('/{elementId}')
  public async getElementById(@Path() elementId: string): Promise<Element> {
    return this.service.getElementById(elementId);
  }

  @Post('/')
  public createElement(@Body() body: ElementCreateBody): Promise<Element> {
    return this.service.createElement(body);
  }

  @Put('/{elementId}')
  public updateElement(
    @Path() elementId: string,
    @Body() body: ElementUpdateBody
  ): Promise<Element> {
    return this.service.updateElement(elementId, body);
  }

  @Delete('/{elementId}')
  public deleteElement(@Path() elementId: string): Promise<void> {
    return this.service.deleteElement(elementId);
  }
}
