import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MQTT_SERVICE } from "./mqtt.constants";
import { MqttController } from "./mqtt.controller";
import { MqttService } from "./mqtt.service";
import { DeviceModule } from "src/device/device.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => DeviceModule),
    ClientsModule.register([
      {
        name: MQTT_SERVICE,
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_HOST || "mqtt://192.168.10.10",
          port: parseInt(process.env.MQTT_PORT, 10) || 1883,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD,
          protocol: "mqtt",
          resubscribe: true,
        },
      },
    ]),
  ],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
