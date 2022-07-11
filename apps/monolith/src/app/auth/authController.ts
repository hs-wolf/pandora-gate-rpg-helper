import { Controller, Route, Tags, Body, Post } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AuthService } from './authService';
import { UserRegisterBody } from '@pandora-gate-rpg-helper/models';

@Tags('Authentication Service')
@Route('/auth')
export class AuthController extends Controller {
  @Inject
  private service: AuthService;

  @Post('/register')
  public async userRegister(@Body() body: UserRegisterBody): Promise<void> {
    return await this.service.userRegister(body);
  }
}
