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
import { CharactersService } from './charactersService';
import {
  Character,
  CharacterCreateBody,
  CharacterUpdateBody,
} from '@pandora-gate-rpg-helper/models';

@Tags('Characters Service')
@Route('/characters')
export class CharactersController extends Controller {
  @Inject
  private service: CharactersService;

  @Get('/users/{userId}')
  public async getCharactersByUserId(
    @Path() userId: string
  ): Promise<Character[]> {
    return this.service.getCharactersByUserId(userId);
  }

  @Get('/{characterId}')
  public async getCharacterById(
    @Path() characterId: string
  ): Promise<Character> {
    return this.service.getCharacterById(characterId);
  }

  @Post('/')
  public createCharacter(
    @Body() body: CharacterCreateBody
  ): Promise<Character> {
    return this.service.createCharacter(body);
  }

  @Put('/{characterId}')
  public updateCharacter(
    @Path() characterId: string,
    @Body() body: CharacterUpdateBody
  ): Promise<Character> {
    return this.service.updateCharacter(characterId, body);
  }

  @Delete('/{characterId}')
  public deleteCharacter(@Path() characterId: string): Promise<void> {
    return this.service.deleteCharacter(characterId);
  }
}
