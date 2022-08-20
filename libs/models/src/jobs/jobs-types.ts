import { Job } from './jobs-classes';

export type JobUpdateBody = Partial<Omit<Job, 'id'>>;
