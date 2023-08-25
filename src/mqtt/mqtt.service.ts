import { MQTT_SERVICE } from "./mqtt.constants";
import { Inject, Injectable } from "@nestjs/common";
import Axios from "axios";
import * as moment from "moment";

@Injectable()
export class MqttService {
  async emergencyResult(uuid, isResult) {
    //console.log('emergencyResult = ' , uuid, 'isResult = ' , isResult)
    const port = process.env.PORT || 3000;
    const url = process.env.DIOT_MASTER_URL;

    try {
      const data = await Axios({
        method: "put",
        url: url + "/v1/emergency/result",
        data: {
          uuid: uuid,
          isResult: isResult,
          updatedAt: moment().toDate(),
        },
      });
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  }
}
