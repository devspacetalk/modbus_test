import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskService } from "src/task/task.service";
import { Repository } from "typeorm";
import { DeviceModel } from "./models/device.model";
import { DeviceSlaveModel } from "./models/device_slave.model";
import { ShareBoothService } from "./shareBooth.service";

@Injectable()
export class DeviceService {
  cronTime =
    process.env.NODE_ENV == "production" ? "*/30 * * * * *" : "*/10 * * * * *";

  constructor(
    private readonly taskService: TaskService,
    private readonly shareBoothService: ShareBoothService,

    @InjectRepository(DeviceModel)
    private deviceRepository: Repository<DeviceModel>,
    @InjectRepository(DeviceSlaveModel)
    private deviceSlaveRepository: Repository<DeviceSlaveModel>
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.taskService.addCronJob("check_devices", this.cronTime, () => {
      this.checkDevices();
    });
  }

  async checkDevices(): Promise<void> {
    await this.shareBoothService.checkDeviceStatus();
  }

  async readSlave(uuid: string): Promise<DeviceSlaveModel> {
    const slave = await this.deviceSlaveRepository.find({
      where: {
        uuid: uuid,
      },
      relations: ["device", "settings", "statuses"],
    });
    return slave[0];
  }

  async getSlave(code) {
    try {
      return await this.deviceSlaveRepository.findOne({
        slaveId: "0x00",
        code: code,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
