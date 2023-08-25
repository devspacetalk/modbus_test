import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ModbusModule } from "src/modbus/modbus.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MqttModule } from "src/mqtt/mqtt.module";
import { DeviceModule } from "src/device/device.module";
import { TaskModule } from "src/task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:
        process.env.DB_TYPE == "mysql"
          ? "mysql"
          : process.env.DB_TYPE == "sqlite"
          ? "sqlite"
          : "sqlite",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "db.sqlite" || process.env.DB_NAME || ":memory:",
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
    ModbusModule,
    MqttModule,
    DeviceModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
