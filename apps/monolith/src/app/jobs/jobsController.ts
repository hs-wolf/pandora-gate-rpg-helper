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
import { JobsService } from './jobsService';
import { Job, JobUpdateBody } from '@pandora-gate-rpg-helper/models';

@Tags('Jobs Service')
@Route('/jobs')
export class JobsController extends Controller {
  @Inject
  private service: JobsService;

  @Get('/{jobId}')
  public async getJobById(@Path() jobId: string): Promise<Job> {
    return this.service.getJobById(jobId);
  }

  @Post('/')
  public createJob(@Body() body: Job): Promise<void> {
    return this.service.createJob(body);
  }

  @Put('/{jobId}')
  public updateJob(
    @Path() jobId: string,
    @Body() body: JobUpdateBody
  ): Promise<void> {
    return this.service.updateJob(jobId, body);
  }

  @Delete('/{jobId}')
  public deleteJob(@Path() jobId: string): Promise<void> {
    return this.service.deleteJob(jobId);
  }
}
