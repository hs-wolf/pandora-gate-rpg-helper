import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_COLLECTION_JOBS } from '../../../constants';
import { IJobsRepo } from './IJobsRepo';
import { Job, JobUpdateBody } from '@pandora-gate-rpg-helper/models';

export class JobsRepoFirestore implements IJobsRepo {
  private firestore = getFirestore();
  private collRef = this.firestore.collection(FIREBASE_COLLECTION_JOBS);

  async getJobById(jobId: string): Promise<Job> {
    const snapshot = await this.collRef.doc(jobId).get();
    return Job.fromFirestore(snapshot);
  }

  async createJob(job: Job): Promise<Job> {
    await this.collRef.doc(job.id).set(job.toMap());
    return Job.fromMap(job);
  }

  async updateJob(jobId: string, body: JobUpdateBody): Promise<void> {
    await this.collRef.doc(jobId).update(body);
  }

  async deleteJob(jobId: string): Promise<void> {
    await this.collRef.doc(jobId).delete();
  }
}
