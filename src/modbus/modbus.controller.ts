import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { getCoilDto, setCoilDto, setResisterDto } from "src/dto/modbusDto";
import { ModbusService } from "./modbus.service";

@Controller("modbus")
@ApiTags("컨트롤러 제어")
export class ModbusController {
  constructor(private readonly modbusService: ModbusService) {}

  @Post("/coil")
  @ApiOperation({
    summary: "코일 제어 1~8번 릴레이 제어",
  })
  @ApiBody({ type: setCoilDto })
  async writeCoil(@Body() body: setCoilDto): Promise<any> {
    console.log(body);
    return await this.modbusService.writeCoil(body.address, body.value);
  }

  @Get("/coil")
  @ApiOperation({
    summary: "코일 상태 읽기 릴레이 상태",
  })
  @ApiBody({ type: getCoilDto })
  async getCoil(@Body() body: getCoilDto): Promise<any> {
    console.log(body);
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
