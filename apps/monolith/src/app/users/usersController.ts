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
import { UsersService } from './usersService';
import { User, UserUpdateBody } from '@pandora-gate-rpg-helper/models';

@Tags('Users Service')
@Route('/users')
export class UsersController extends Controller {
  @Inject
  private service: UsersService;

  @Get('/{userId}')
  public async getUserById(@Path() userId: string): Promise<User> {
    return this.service.getUserById(userId);
  }

  @Post('/')
  public createUser(@Body() body: User): Promise<void> {
    return this.service.createUser(body);
  }

  @Put('/{userId}')
  public updateUser(
    @Path() userId: string,
    @Body() body: UserUpdateBody
  ): Promise<void> {
    return this.service.updateUser(userId, body);
  }

  @Delete('/{userId}')
  public deleteUser(@Path() userId: string): Promise<void> {
    return this.service.deleteUser(userId);
  }
}
