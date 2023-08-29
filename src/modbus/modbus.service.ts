import { Injectable } from "@nestjs/common";
import ModbusRTU from "modbus-serial";

@Injectable()
export class ModbusService {
  private client: ModbusRTU;

  public slaveID = {
    DOOR: parseInt(process.env.ADDRESS_DOOR), //2, // 포트 1번
    AIR_CONDITIONER: parseInt(process.env.ADDRESS_AIR_CONDITIONER), //-1, //
    AIR_PURIFIER: parseInt(process.env.ADDRESS_AIR_PURIFIER), //7, // 포트 2번
    LIGHT_INNER: parseInt(process.env.ADDRESS_LIGHT_INNER), //1, // 포트 7번
    LIGHT_OUTER: parseInt(process.env.ADDRESS_LIGHT_OUTER), //3, // 포트 8번
    AWNING: parseInt(process.env.ADDRESS_AWNING), //-1,
    BLIEND: parseInt(process.env.ADDRESS_BLIEND), //-1,
  };

  Deleay = 1000;
  constructor() {
    //장비 연결 안했을시 주석처리 필요
    //this.connect();
  }
  async connect(): Promise<void> {
    this.client = new ModbusRTU();
    this.client.connectRTUBuffered("/dev/ttyUSB0", {
      baudRate: 9600,
      parity: "even",
      stopBits: 1,
      dataBits: 8,
    });
    this.client.setID(1); // Modbus slave ID
  }

  async disconnect(): Promise<void> {
    await this.client.close;
  }

  //시스템 on 1. 문열림, 조명 켜짐, 에어컨 켜짐, 블라이더 내려옴
  async systemOn() {
    console.log("this.slaveID.DOOR", this.slaveID);
    // 문열림
    await this.writeCoil(this.slaveID.DOOR, true);
    //조명 켜짐
    await this.writeCoil(this.slaveID.LIGHT_INNER, true);
    //에어컨 켜짐
    await this.writeCoil(this.slaveID.AIR_CONDITIONER, true);
    //블라인더 내려옴
    await this.writeCoil(this.slaveID.BLIEND, false);
  }

  //시스템 off 1. 문열림 조명 꺼짐, 에어컨 꺼짐 ,블라인더 올라옴
  async systemOff() {
    // 문열림
    await this.writeCoil(this.slaveID.DOOR, true);
    //조명 꺼짐
    await this.writeCoil(this.slaveID.LIGHT_INNER, false);
    //에어컨 꺼짐
    await this.writeCoil(this.slaveID.AIR_CONDITIONER, false);
    //블라인더 올라옴
    await this.writeCoil(this.slaveID.BLIEND, true);
  }

  async control(slave, value) {
    switch (slave) {
      case this.slaveID.DOOR:
        await this.writeCoil(this.slaveID.DOOR, value);
        break;
      case this.slaveID.AIR_CONDITIONER:
        await this.writeCoil(this.slaveID.AIR_CONDITIONER, value);
        break;
      case this.slaveID.AIR_PURIFIER:
        await this.writeCoil(this.slaveID.AIR_PURIFIER, value);
        break;
      case this.slaveID.LIGHT_INNER:
        await this.writeCoil(this.slaveID.LIGHT_INNER, value);
        break;
      case this.slaveID.LIGHT_OUTER:
        await this.writeCoil(this.slaveID.LIGHT_OUTER, value);
        break;
      case this.slaveID.AWNING:
        await this.writeCoil(this.slaveID.AWNING, value);
        break;
      case this.slaveID.BLIEND:
        await this.writeCoil(this.slaveID.BLIEND, value);
        break;
    }
  }

  async writeCoil(address: number, value: boolean): Promise<void> {
    try {
      await this.client.writeCoil(address, value);
      console.log(
        `Successfully wrote coil at address ${address} with value ${value}`
      );
    } catch (error) {
      console.error(`Error writing coil: ${error}`);
    }
  }
  async readCoil(address: number, lenght: number): Promise<void> {
    try {
      await this.client.readCoils(address, lenght);
      console.log(
        `Successfully wrote coil at address ${address} with lenght ${lenght}`
      );
    } catch (error) {
      console.error(`Error writing coil: ${error}`);
    }
  }
  async writeRegister(address: number, value: number): Promise<void> {
    try {
      await this.client.writeRegister(address, value);
      console.log(
        `Successfully wrote coil at address ${address} with value ${value} `
      );
    } catch (error) {
      console.error(`Error writing coil: ${error}`);
    }
  }
  // async readRegister(address: number, lenght: number): Promise<void> {
  //   try {
  //     await this.client.readRegistersEnron(address, lenght);
  //     console.log(
  //       `Successfully wrote coil at address ${address} with lenght ${lenght}`,
  //     );
  //   } catch (error) {
  //     console.error(`Error writing coil: ${error}`);
  //   }
  // }
}
