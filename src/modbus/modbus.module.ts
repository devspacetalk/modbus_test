import { Module, forwardRef } from "@nestjs/common";
import { ModbusService } from "./modbus.service";
import { ModbusController } from "./modbus.controller";
import { DeviceModule } from "src/device/device.module";

@Module({
  imports: [forwardRef(() => DeviceModule)],
  providers: [ModbusService],
  exports: [ModbusService],
  controllers: [ModbusController],
})
export class ModbusModule {}
