import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ModbusModule } from "src/modbus/modbus.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.forRoot(), ModbusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
