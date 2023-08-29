import { Body, Controller, Get, Post, Req, Put } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { getCoilDto, setCoilDto, setResisterDto } from "src/dto/modbusDto";
import { ModbusService } from "./modbus.service";
import { Request } from "express";

@Controller("modbus")
@ApiTags("modbus 컨트롤러 제어")
export class ModbusController {
  constructor(private readonly modbusService: ModbusService) {}

  @Post("/connect")
  @ApiOperation({
    summary: "컨트롤러 connect",
  })
  async connect(@Req() req: Request): Promise<any> {
    return await this.modbusService.connect();
  }

  @Post("/disconnect")
  @ApiOperation({
    summary: "컨트롤러 disconnect",
  })
  async disconnect(@Req() req: Request): Promise<any> {
    return await this.modbusService.disconnect();
  }

  @Put("/system_on")
  @ApiOperation({
    summary: "컨트롤러 system_on",
  })
  async system_on(@Req() req: Request): Promise<any> {
    return await this.modbusService.systemOn();
  }

  @Put("/system_off")
  @ApiOperation({
    summary: "컨트롤러 system_on",
  })
  async system_off(@Req() req: Request): Promise<any> {
    return await this.modbusService.systemOff();
  }

  @Post("/control")
  @ApiOperation({
    summary: "컨트롤러 제어",
  })
  @ApiBody({ type: setCoilDto })
  async control(@Body() body: setCoilDto): Promise<any> {
    return await this.modbusService.control(body.address, body.value);
  }

  @Post("/coil")
  @ApiOperation({
    summary: "코일 제어 1~8번 릴레이 제어",
  })
  @ApiBody({ type: setCoilDto })
  async writeCoil(@Body() body: setCoilDto): Promise<any> {
    console.log(body);
    return await this.modbusService.writeCoil(body.address, body.value);
  }

  @Post("/getcoil")
  @ApiOperation({
    summary: "코일 상태 읽기 릴레이 상태",
  })
  @ApiBody({ type: getCoilDto })
  async getCoil(@Body() body: getCoilDto): Promise<any> {
    return await this.modbusService.readCoil(body.address, body.lenght);
  }

  @Post("/resister")
  @ApiOperation({
    summary: "레지스터 제어 1~8번 에어컨 제어",
  })
  @ApiBody({ type: setResisterDto })
  async writeResister(@Body() body: setResisterDto): Promise<any> {
    console.log(body);
    return await this.modbusService.writeRegister(body.address, body.value);
  }
  // END: 제어부
}
