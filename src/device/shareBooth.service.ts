import { DeviceStatusModel } from "src/device/models/device_status.model";
import Axios from "axios";
import * as moment from "moment";
import { DeviceSlaveModel } from "src/device/models/device_slave.model";

import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ModbusService } from "src/modbus/modbus.service";
import { DeviceService } from "./device.service";

@Injectable()
export class ShareBoothService {
  SystemControl: DeviceSlaveModel = null;
  SBAwning: DeviceSlaveModel = null;
  Blind: DeviceSlaveModel = null;
  Light: DeviceSlaveModel = null;
  Door: DeviceSlaveModel = null;
  SBDustLight: DeviceSlaveModel = null;
  AirConditioner: DeviceSlaveModel = null;

  DustLight_blue = 30;
  DustLight_green = 50;
  DustLight_yellow = 100;
  DustLight_red = 101;

  cacheDataTime: any;
  welcome_cacheDataTime: any;

  time_min = null;
  time_max = null;
  close5_cache = false;
  close_cache = false;

  //공유부스 시스템 플래그  false 이면 굳이~ 통신이나 이럴 필요 없어보임
  SHAREBOOTH_SYSTEM = false;
  SHAREBOOTH_SYSTEM_EMERGENSY = "정상";
  EMERGENSY_TIMEDURATION = 10;

  path = require("path");
  sound = require("sound-play");

  public slaveID = {
    DOOR: parseInt(process.env.ADDRESS_DOOR), //2, // 포트 1번
    AIR_CONDITIONER: parseInt(process.env.ADDRESS_AIR_CONDITIONER), //-1, //
    AIR_PURIFIER: parseInt(process.env.ADDRESS_AIR_PURIFIER), //7, // 포트 2번
    LIGHT_INNER: parseInt(process.env.ADDRESS_LIGHT_INNER), //1, // 포트 7번
    LIGHT_OUTER: parseInt(process.env.ADDRESS_LIGHT_OUTER), //3, // 포트 8번
    AWNING: parseInt(process.env.ADDRESS_AWNING), //-1,
    BLIEND: parseInt(process.env.ADDRESS_BLIEND), //-1,
  };

  constructor(
    @Inject(forwardRef(() => ModbusService))
    private readonly modbusService: ModbusService,
    @Inject(forwardRef(() => DeviceService))
    private readonly deviceService: DeviceService
  ) {
    //서비스 실행시 모드버스 연결 시도
    //컨트롤러 연결 없을시 주석처리후 테스트
    //this.modbusService.connect();
  }

  // 쉐어부스 상태 요청
  async reqStatus(): Promise<any> {
    // if (this.SystemControl == null)
    //   this.SystemControl = await this.getSlave("SystemControl");

    // if (this.SystemControl != null) {
    //   // console.log('systemcontrol 상태조회')
    //   this.shareBoothSystem.reqStatus(this.SystemControl);
    // }

    // //공유부스 시스템이 ON 되지 true 되지 않으면 굳이 통신 할필요 없어 보임
    // if (this.SHAREBOOTH_SYSTEM == false) return;
    // //상태값 조회시 slave 없으면 가져오도록 한다.
    // if (this.SBAwning == null) this.SBAwning = await this.getSlave("SBAwning");

    // if (this.Blind == null) this.Blind = await this.getSlave("Blind");

    // if (this.Light == null) this.Light = await this.getSlave("Light");

    // if (this.Door == null) this.Door = await this.getSlave("Door");

    // if (this.SBDustLight == null)
    //   this.SBDustLight = await this.getSlave("SBDustLight");

    return false;
  }

  // 예약시간 오픈
  async turnOn(): Promise<boolean> {
    return true;
  }
  // Close
  async turnOff(): Promise<boolean> {
    return true;
  }

  async shareBoothControl(code, sbMode) {
    console.log("uuid = ", code, "  sbMode = ", sbMode);
    if (code == null || sbMode == null) return;

    // "DOOR" :   //mode: 0 문닫힘, 1 문열림
    // "AWNING" :  //mode: 0 어닝닫힘, 1 어닝열림
    // "BLIND" :  //mode: 0 블라인더 닫힘, 1 블라인더열림, 2 블라인더스탑
    // "LIGHT" : //mode: 0 불꺼짐, 1 불켜짐

    switch (code) {
      case "SystemControl":
        if (sbMode.mode == 0) {
          this.sound.play(this.getSoundFile("return.mp3"));
          await this.systemControl(false);
          this.time_min = null;
          this.time_max = null;
        } else {
          console.log("예약시간 설정 = ", this.time_max);
          this.time_min = sbMode.time_min;
          this.time_max = sbMode.time_max;
          //웰컴 사운드 재생
          this.sound.play(this.getSoundFile("welcome.mp3"));
          this.welcome_cacheDataTime = moment();
          await this.systemControl(true);
        }

        break;
      case "SBAwning":
        if (sbMode == 0) {
          this.sound.play(this.getSoundFile("awning-close.mp3"));
          await this.awningControl(false);
        } else {
          this.sound.play(this.getSoundFile("awning-open.mp3"));
          await this.awningControl(true);
        }

        break;
      case "Blind":
        if (sbMode == 0) {
          this.sound.play(this.getSoundFile("blind-close.mp3"));
          await this.blindControl(true);
        } else if (sbMode == 1) {
          this.sound.play(this.getSoundFile("blind-open.mp3"));
          await this.blindControl(false);
        } else {
          this.sound.play(this.getSoundFile("blind-stop.mp3"));
          await this.blindControl("stop");
        }

        break;
      case "Light":
        if (sbMode == 0) {
          this.sound.play(this.getSoundFile("light-off.mp3"));
          await this.lightControl(false);
        } else {
          this.sound.play(this.getSoundFile("light-on.mp3"));
          await this.lightControl(true);
        }

        break;
      case "Door":
        if (sbMode == 0) {
          this.sound.play(this.getSoundFile("door-close.mp3"));
          await this.doorControl(false);
        } else {
          this.sound.play(this.getSoundFile("door-open.mp3"));
          await this.doorControl(true);
        }

        break;
      case "AirConditioner":
        if (sbMode == 0) {
          this.sound.play(this.getSoundFile("aircon-off.mp3"));
          await this.airconditionerControl(false);
        } else {
          this.sound.play(this.getSoundFile("aircon-on.mp3"));
          await this.airconditionerControl(true);
        }
        break;
    }
  }
  public getSoundFile(fileName) {
    const filePath = this.path.join(
      __dirname,
      "../../../public/sounds/" + fileName
    );
    return filePath;
  }
  async systemControl(value) {
    if (this.SystemControl == null)
      this.SystemControl = await this.deviceService.getSlave("SystemControl");

    if (value == true || value == "true") await this.modbusService.systemOn();
    else await this.modbusService.systemOff();

    console.log("시스템이", value, " 되었습니다.");
  }

  async systemOn() {
    if (this.SystemControl == null)
      this.SystemControl = await this.deviceService.getSlave("SystemControl");

    this.close5_cache = false;
    this.close_cache = false;

    await this.modbusService.systemOn();
    console.log("시스템 운영시작 되었습니다.");
  }
  async systemOff() {
    if (this.SystemControl == null)
      this.SystemControl = await this.deviceService.getSlave("SystemControl");

    await this.modbusService.systemOff();

    console.log("시스템 운영종료 되었습니다.");
  }

  async airconditionerControl(value) {
    if (this.AirConditioner == null)
      this.AirConditioner = await this.deviceService.getSlave("AirConditioner");

    await this.modbusService.control(this.slaveID.AIR_CONDITIONER, value);
    console.log("에어컨이", value, " 되었습니다.");
  }

  async doorControl(value) {
    if (this.Door == null)
      this.Door = await this.deviceService.getSlave("Door");

    await this.modbusService.control(this.slaveID.DOOR, value);
    console.log("도어가", value, " 되었습니다.");
  }
  async lightControl(value) {
    if (this.Light == null)
      this.Light = await this.deviceService.getSlave("Light");

    await this.modbusService.control(this.slaveID.LIGHT_INNER, value);
    console.log("내부조명이", value, " 되었습니다.");
  }

  async awningControl(value) {
    if (this.SBAwning == null)
      this.SBAwning = await this.deviceService.getSlave("SBAwning");

    await this.modbusService.control(this.slaveID.AWNING, value);
    console.log("어닝이", value, " 되었습니다.");
  }

  async blindControl(value) {
    if (this.Blind == null)
      this.Blind = await this.deviceService.getSlave("Blind");
    //this.modbusService.blindControl(this.Blind, blind);
    await this.modbusService.control(this.slaveID.BLIEND, value);
    console.log("블라인더", value, " 되었습니다.");
  }

  async readTimeDuration() {
    let currentTime;

    if (this.cacheDataTime == "" || this.cacheDataTime == null)
      this.cacheDataTime = moment();
    else currentTime = moment();

    if (currentTime == null) return;

    if (this.cacheDataTime == null) return;

    return moment.duration(currentTime.diff(this.cacheDataTime)).asMinutes();
  }

  async readWelecomeTimeDuration() {
    let currentTime;

    if (this.welcome_cacheDataTime == "" || this.welcome_cacheDataTime == null)
      this.welcome_cacheDataTime = moment();
    else currentTime = moment();

    if (currentTime == null) return false;

    if (this.welcome_cacheDataTime == null) return false;

    //console.log('moment.duration(currentTime.diff(this.cacheDataTime)).asSeconds() = ' , moment.duration(currentTime.diff(this.cacheDataTime)).asSeconds());
    if (
      moment
        .duration(currentTime.diff(this.welcome_cacheDataTime))
        .asSeconds() > 23
    )
      return true;
    else return false;
  }

  async emergencyDuration(checkTime) {
    const currentTime = moment();
    const time = checkTime.checkDate;

    return moment.duration(currentTime.diff(time)).asMinutes();
  }

  async checkCloseTime() {
    if (this.time_max == null) return;

    const nowTime = moment();
    const closeTime = moment(this.time_max, "HHmm");

    const duration = moment.duration(closeTime.diff(nowTime)).asMinutes();
    //남은 시간이 5분 이하 1분 사이이면 종료 5분전 사운드 재생
    //console.log('checkCloseTime duration = ' , duration);
    if (duration <= 10 && duration > 8) {
      //종료 5분전 사운드 재생
      if (this.close5_cache == false) {
        if ((await this.readWelecomeTimeDuration()) == true) {
          this.sound.play(this.getSoundFile("close10.mp3"));
          this.close5_cache = true;
          this.welcome_cacheDataTime = null;
        } else {
          this.close5_cache = false;
        }
      }
    } else if (duration <= 1) {
      if (this.close_cache == false) {
        this.sound.play(this.getSoundFile("close.mp3"));
        this.close_cache = true;
        this.systemOff();
      }
    }
  }
  async checkDeviceStatus(): Promise<DeviceStatusModel> {
    //운영 종료시간 체크
    this.checkCloseTime();

    return null;
  }

  //공유부스 slave 상태값 저장
  async setDeviceStatus(device, status): Promise<any> {
    const url = "http://sharebooth.spacetalk.co.kr/v1/booth/slave-status";

    const slave_data = {
      slaveID: device[0].id,
      status: status.status,
      status_checkDate: status.checkDate,
    };

    try {
      const data = await Axios({
        method: "put",
        url: url,
        data: slave_data,
      });

      if (data.data == null) return null;

      //console.log('data = ' , data.data);
    } catch (e) {
      console.log(e.data);
    }
  }
}
