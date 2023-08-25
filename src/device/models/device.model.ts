import { DeviceLogModel } from "./device_log.model";
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceStatusModel } from "./device_status.model";
import { DeviceSettingModel } from "./device_setting.model";
import { DeviceOperatingMode, DeviceSettingCategory } from "./device.enum";
import { DeviceSlaveModel } from "./device_slave.model";

@Entity("tbl_devices")
export class DeviceModel {
  @PrimaryColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "serialNumber", unique: true, length: 45 })
  serialNumber: string;

  // @Column('int', {name: 'productId'})
  // productId: number;

  @Column("varchar", { name: "siteId" })
  siteId: number;

  // @Column('varchar', { name: 'productNumber', nullable: true, length: 45 })
  // productNumber: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 1000 })
  description: string;

  @Column("varchar", { name: "addr", nullable: true, length: 45 })
  addr: string;

  @Column("varchar", { name: "clientaddr", nullable: true })
  clientaddr: string;

  @Column("varchar", { name: "authCode", nullable: true, length: 45 })
  authCode: string;

  @Column("varchar", { name: "group", nullable: true, length: 45 })
  group: string;

  @Column("datetime", { name: "installedAt", nullable: true })
  installedAt: Date;

  @Column("datetime", { name: "guaranteeAt", nullable: true })
  guaranteeAt: Date;

  @Column("varchar", { name: "qrcode", nullable: true, length: 1000 })
  qrcode: string;

  @Column("varchar", { name: "image", nullable: true, length: 1000 })
  image: string;

  @Column("datetime", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => DeviceSlaveModel, (slave) => slave.device, { cascade: true })
  slave: DeviceSlaveModel[];

  @OneToMany(() => DeviceStatusModel, (status) => status.device, {
    cascade: true,
  })
  statuses: DeviceStatusModel[];

  @OneToMany(() => DeviceSettingModel, (setting) => setting.device, {
    cascade: true,
  })
  settings: DeviceSettingModel[];
}
