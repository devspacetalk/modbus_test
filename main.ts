import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface";
import { AppModule } from "./app.module";
import { setupSwagger } from "src/util/swagger";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_HOST || "mqtt://192.168.10.10",
      port: 1883,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      protocol: "mqtt",
      resubscribe: true,
    },
  });
  await app.startAllMicroservicesAsync();

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
