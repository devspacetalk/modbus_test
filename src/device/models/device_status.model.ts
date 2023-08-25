import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceModel } from "./device.model";

import { DeviceSlaveModel } from "./device_slave.model";

@Entity("tbl_device_statuses")
export class DeviceStatusModel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "deviceId" })
  deviceId: number;

  @Column("varchar", { name: "uuid", nullable: true })
  uuid: string;

  @Column("boolean", { name: "isOn", nullable: true, default: null })
  isOn: boolean;

  @Column("boolean", { name: "isOperatingOn", nullable: true })
  isOperatingOn: boolean | null;

  @Column("varchar", { name: "mode", nullable: true })
  mode: string | null;

  @Column("varchar", { name: "situation", nullable: true, length: 45 })
  situation: string | null;

  @Column("varchar", { name: "reason", nullable: true, length: 45 })
  reason: string | null;

  @Column("boolean", { name: "projectorIsPlay", nullable: true })
  projectorIsPlay: boolean | null; //스마트 글라스 플레이 확인

  @Column("varchar", { name: "projectorStatus", nullable: true })
  projectorStatus: string | null;

  @Column("boolean", { name: "smartGlassMusicIsPlay", nullable: true })
  smartGlassMusicIsPlay: boolean | null;

  @Column("boolean", { name: "smartGlassVideoIsPlay", nullable: true })
  smartGlassVideoIsPlay: boolean | null;

  @Column("boolean", { name: "smartGlassGameIsPlay", nullable: true })
  smartGlassGameIsPlay: boolean | null;

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

  @ManyToOne(() => DeviceModel, (device) => device.statuses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: DeviceModel;

  //slave(1) <-> status(N)
  @ManyToOne(() => DeviceSlaveModel, (slave) => slave.statuses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  slave: DeviceSlaveModel;

  // current status
  // on/off 추가
}
