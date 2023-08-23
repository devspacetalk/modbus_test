import { Injectable } from "@nestjs/common";
import ModbusRTU from "modbus-serial";

@Injectable()
export class ModbusService {
  private client: ModbusRTU;

  constructor() {
    //장비 연결 안했을시 주석처리 필요
    this.client = new ModbusRTU();
    this.client.connectRTUBuffered("/dev/ttyUSB0", {
      baudRate: 9600,
      parity: "even",
      stopBits: 1,
      dataBits: 8,
    });
    this.client.setID(1); // Modbus slave ID
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

  async disconnect(): Promise<void> {
    await this.client.close;
  }
}
