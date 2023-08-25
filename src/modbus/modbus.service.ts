import { Injectable } from "@nestjs/common";
import ModbusRTU from "modbus-serial";
import { slaveID } from "src/dto/modbusDto";

@Injectable()
export class ModbusService {
  private client: ModbusRTU;
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
    // 문열림
    await this.writeCoil(slaveID.DOOR, true);

    //조명 켜짐
    setTimeout(async () => {
      await this.writeCoil(slaveID.LIGHT_INNER, true);
    }, this.Deleay);

    //에어컨 켜짐
    await this.writeCoil(slaveID.AIR_CONDITIONER, true);
    //블라인더 내려옴
    setTimeout(async () => {
      await this.writeCoil(slaveID.BLIEND, false);
    }, this.Deleay);
  }

  //시스템 off 1. 문열림 조명 꺼짐, 에어컨 꺼짐 ,블라인더 올라옴
  async systemOff() {
    // 문열림
    await this.writeCoil(slaveID.DOOR, true);
    //조명 꺼짐
    await this.writeCoil(slaveID.LIGHT_INNER, false);
    //에어컨 꺼짐
    await this.writeCoil(slaveID.AIR_CONDITIONER, false);
    //블라인더 올라옴
    await this.writeCoil(slaveID.BLIEND, true);
  }

  async control(slaveID, value) {
    switch (slaveID) {
      case slaveID.DOOR:
        await this.writeCoil(slaveID.DOOR, value);
        break;
      case slaveID.AIR_CONDITIONER:
        await this.writeCoil(slaveID.AIR_CONDITIONER, value);
        break;
      case slaveID.AIR_PURIFIER:
        await this.writeCoil(slaveID.AIR_PURIFIER, value);
        break;
      case slaveID.LIGHT_INNER:
        await this.writeCoil(slaveID.LIGHT_INNER, value);
        break;
      case slaveID.LIGHT_OUTER:
        await this.writeCoil(slaveID.LIGHT_OUTER, value);
        break;
      case slaveID.AWNING:
        await this.writeCoil(slaveID.AWNING, value);
        break;
      case slaveID.BLIEND:
        await this.writeCoil(slaveID.BLIEND, value);
        break;
    }
  }

  async writeCoil(address: number, value: boolean): Promise<void> {
    try {
      const result = await this.client.writeCoil(address, value);
      console.log(
        `Successfully wrote coil at address ${address} with value ${value} result = ${result}`
      );
    } catch (error) {
      console.error(`Error writing coil: ${error}`);
    }
  }
  async readCoil(address: number, lenght: number): Promise<void> {
    try {
      const result = await this.client.readCoils(address, lenght);
      console.log(
        `Successfully wrote coil at address ${address} with lenght ${lenght} result = ${result}`
      );
    } catch (error) {
      console.error(`Error writing coil: ${error}`);
    }
  }
  async writeRegister(address: number, value: number): Promise<void> {
    try {
      const result = await this.client.writeRegister(address, value);
      console.log(
        `Successfully wrote coil at address ${address} with value ${value} result = ${result}`
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
