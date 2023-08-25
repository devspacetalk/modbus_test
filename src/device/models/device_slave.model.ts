import { DeviceOperatingMode } from "src/device/models/device.enum";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";
import { DeviceModel } from "./device.model";
import { DeviceStatusModel } from "./device_status.model";
import { DeviceSettingModel } from "./device_setting.model";
import { DeviceRecommendModel } from "./device_recommend.model";

@Entity("tbl_devices_slave")
export class DeviceSlaveModel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "uuid",
    unique: true,
    length: 45,
  })
  uuid: string;

  @Column("int", { name: "deviceId" })
  deviceId: number;

  @Column("varchar", { name: "slaveType", nullable: true, length: 45 })
  slaveType: string | null;

  @Column("varchar", { name: "code", length: 45 })
  code: string;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 1000 })
  description: string;

  @Column("varchar", { name: "slaveId", nullable: true, length: 45 })
  slaveId: string;

  @Column("varchar", { name: "type", nullable: true })
  type: string;

  @Column("varchar", { name: "plugId", nullable: true, length: 45 })
  plugId: string;

  @Column("varchar", { name: "operMode", nullable: true })
  operMode: string;

  @Column("varchar", { name: "mode", nullable: true })
  mode: string;

  @Column("varchar", { name: "port", nullable: true, length: 45 })
  port: string;

  @Column("boolean", { name: "onoff", nullable: true })
  onoff: boolean;

  @Column("datetime", { name: "installedAt", nullable: true })
  installedAt: Date;

  @Column("varchar", { name: "emergency", nullable: true })
  emergency: string;

  @Column("boolean", { name: "isOperating", nullable: true })
  isOperating: boolean;

  @Column("varchar", { name: "battery", nullable: true, length: 45 })
  battery: string;

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

  //device(1) <-> slave(N)
  @ManyToOne(() => DeviceModel, (device) => device.slave, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: DeviceModel;

  //slave(1) <-> status (N)
  @OneToMany(() => DeviceStatusModel, (status) => status.slave, {
    cascade: true,
  })
  @JoinColumn([{ name: "uuid", referencedColumnName: "uuid" }])
  statuses: DeviceStatusModel;

  //slave(1) <-> setting (N)
  @OneToMany(() => DeviceSettingModel, (setting) => setting.slave, {
    cascade: true,
  })
  settings: DeviceSettingModel[];

  @OneToMany(() => DeviceRecommendModel, (setting) => setting.slave, {
    cascade: true,
  })
  recommend: DeviceRecommendModel[];
}
