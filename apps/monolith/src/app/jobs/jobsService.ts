import { IJobsRepo } from './repos/IJobsRepo';
import { JobsRepoFirestore } from './repos/jobsRepoFirestore';
import {
  ApiError,
  ResponseCodes,
  Job,
  JobUpdateBody,
} from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

export class JobsService {
  private _jobsRepo: IJobsRepo;

  constructor(jobsRepo?: IJobsRepo) {
    this._jobsRepo = jobsRepo ?? new JobsRepoFirestore();
  }

  async getJobById(jobId: string): Promise<Job> {
    try {
      const job = await this._jobsRepo.getJobById(jobId);
      if (!job) {
        throw new ApiError(
          ResponseCodes.NOT_FOUND,
          `Could not find job with jobId: ${jobId}.`
        );
      }
      return job;
    } catch (error) {
      handleError(error);
    }
  }

  async createJob(job: Job): Promise<void> {
    try {
      await this._jobsRepo.createJob(job);
    } catch (error) {
      handleError(error);
    }
  }

  async updateJob(
    jobId: string,
    body: JobUpdateBody
  ): Promise<void> {
    try {
      await this._jobsRepo.updateJob(jobId, body);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteJob(jobId: string): Promise<void> {
    try {
      await this._jobsRepo.deleteJob(jobId);
    } catch (error) {
      handleError(error);
    }
  }
}
