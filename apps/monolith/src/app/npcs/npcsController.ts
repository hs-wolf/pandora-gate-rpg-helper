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
import { NpcsService } from './npcsService';
import { Npc, NpcUpdateBody } from '@pandora-gate-rpg-helper/models';

@Tags('Npcs Service')
@Route('/npcs')
export class NpcsController extends Controller {
  @Inject
  private service: NpcsService;

  @Get('/{npcId}')
  public async getNpcById(@Path() npcId: string): Promise<Npc> {
    return this.service.getNpcById(npcId);
  }

  @Post('/')
  public createNpc(@Body() body: Npc): Promise<void> {
    return this.service.createNpc(body);
  }

  @Put('/{npcId}')
  public updateNpc(
    @Path() npcId: string,
    @Body() body: NpcUpdateBody
  ): Promise<void> {
    return this.service.updateNpc(npcId, body);
  }

  @Delete('/{npcId}')
  public deleteNpc(@Path() npcId: string): Promise<void> {
    return this.service.deleteNpc(npcId);
  }
}
