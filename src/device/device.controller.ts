import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { DeviceService } from "./device.service";
import { DeviceSlaveModel } from "./models/device_slave.model";
@Controller("devices")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post("/")
  async create(
    @Req() req: Request,
    @Body() device: DeviceSlaveModel
  ): Promise<DeviceSlaveModel> {
    // return await this.deviceService.save(device);
    return null;
  }

  @Get("/getSlave/:code")
  async getSlave(@Req() req: Request): Promise<any> {
    // return await this.deviceService.getSlave(req.params.code);
    return null;
  }

  // END: 제어부
}
