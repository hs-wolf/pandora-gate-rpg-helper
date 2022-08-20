import { Job, JobUpdateBody } from '@pandora-gate-rpg-helper/models';

export interface IJobsRepo {
  getJobById(jobId: string): Promise<Job>;

  createJob(job: Job): Promise<Job>;

  updateJob(jobId: string, body: JobUpdateBody): Promise<void>;

  deleteJob(jobId: string): Promise<void>;
}
