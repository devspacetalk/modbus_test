import { Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob, CronCommand } from "cron";

@Injectable()
export class TaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(TaskService.name);

  addCronJob(name: string, cronTime: string, callback: CronCommand): void {
    this.deleteCron(name);
    const job = new CronJob(cronTime, callback);
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added`);
  }

  deleteCron(name: string): void {
    if (this.schedulerRegistry.getCronJobs().get(name)) {
      this.schedulerRegistry.deleteCronJob(name);
      this.logger.warn(`job ${name} deleted!`);
    }
  }
}
