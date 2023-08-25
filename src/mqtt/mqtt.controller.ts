import { Controller, Inject, forwardRef } from "@nestjs/common";
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from "@nestjs/microservices";
import { MqttService } from "./mqtt.service";
import { ApiTags } from "@nestjs/swagger";
import { DeviceService } from "src/device/device.service";
import { ShareBoothService } from "src/device/shareBooth.service";

@Controller("mqtt")
@ApiTags("mqtt 컨트롤러")
export class MqttController {
  constructor(
    @Inject(forwardRef(() => DeviceService))
    private readonly deviceService: DeviceService,
    @Inject(forwardRef(() => ShareBoothService))
    private readonly shareboothService: ShareBoothService,
    private readonly mqttService: MqttService
  ) {}

  @MessagePattern("Diot/api-server/#")
  async getmqtt(@Payload() payload: number[], @Ctx() context: MqttContext) {
    const deviceId = this.getDeviceId(context.getTopic());
    const uuid = this.getDeviceUUID(context.getTopic());

    const slave = await this.getDevice(uuid);
    const data = this.parse(payload);

    if (data == null) return;

    //공유부스 모드 변경
    if (data.sbMode != null) {
      console.log("data.sbmode = ", data.sbMode);

      await this.shareboothService.shareBoothControl(slave.code, data.sbMode);
    }
  }
  async getDevice(uuid: string): Promise<any> {
    if (uuid == null) {
      return null;
    }
    return await this.deviceService.readSlave(uuid);
  }

  public getDeviceId(topic: string): string {
    const regex = new RegExp("Diot/api-server/.+");
    if (regex.exec(topic)) {
      const deviceId = topic.split("/")[2];
      return deviceId;
    }
    return null;
  }
  public getDeviceUUID(topic: string): string {
    const regex = new RegExp("Diot/api-server/.+");
    if (regex.exec(topic)) {
      const uuid = topic.split("/")[3];
      return uuid;
    }
    return null;
  }
  public getDeviceEmergency(topic: string): string {
    const regex = new RegExp("Diot/api-emergency/.+");
    if (regex.exec(topic)) {
      const uuid = topic.split("/")[2];
      return uuid;
    }
    return null;
  }

  public parse(objData: any) {
    let obj;

    if (objData.msg.action == null) {
      obj = {
        code: objData.msg.code ? objData.msg.code : null,
        setting: objData.msg.setting ? objData.msg.setting : null,
        pick: objData.msg.pick ? objData.msg.pick : null,
        playTime: objData.msg.playTime ? objData.msg.playTime : null,
        onoff: objData.msg.onoff ? objData.msg.onoff : null,
        reload: objData.msg.reload ? objData.msg.reload : null,
        device: objData.msg.device ? objData.msg.device : null,
        sbMode: objData.msg.sbMode ? objData.msg.sbMode : null,
      };
    } else {
      obj = {
        code: objData.msg.code,
        isOn: objData.msg.action[0].isOn ? objData.msg.action[0].isOn : null,
        mode: objData.msg.action[0].mode ? objData.msg.action[0].mode : null,
        type: objData.msg.action[0].type ? objData.msg.action[0].type : null,
      };
    }

    return obj;
  }
}
