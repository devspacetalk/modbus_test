import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";
import { TaskModule } from "src/task/task.module";
import { DeviceModel } from "./models/device.model";
import { DeviceSettingModel } from "./models/device_setting.model";
import { DeviceStatusModel } from "./models/device_status.model";
import { DeviceLogModel } from "./models/device_log.model";
import { DeviceGameModel } from "./models/device_game.model";
import { DeviceVideoModel } from "./models/device_video.model";
import { DeviceMusicModel } from "./models/device_music.model";
import { DeviceSlaveModel } from "./models/device_slave.model";
import { DeviceRecommendModel } from "./models/device_recommend.model";
import { ModbusModule } from "src/modbus/modbus.module";
import { ShareBoothService } from "./shareBooth.service";

@Module({
  imports: [
    TaskModule,
    forwardRef(() => ModbusModule),
    TypeOrmModule.forFeature([
      DeviceModel,
      DeviceSettingModel,
      DeviceStatusModel,
      DeviceLogModel,
      DeviceGameModel,
      DeviceVideoModel,
      DeviceMusicModel,
      DeviceSlaveModel,
      DeviceRecommendModel,
    ]),
  ],
  providers: [DeviceService, ShareBoothService],
  exports: [DeviceService, ShareBoothService],
  controllers: [DeviceController],
})
export class DeviceModule {}
