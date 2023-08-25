import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceModel } from "./device.model";
import { DeviceSlaveModel } from "./device_slave.model";

@Entity("tbl_devices_video")
export class DeviceVideoModel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "deviceId" })
  deviceId: number;

  @Column("varchar", { name: "uuid", length: 45 })
  uuid: string;

  @Column("varchar", { name: "name", length: 1000 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 1000 })
  description: string;

  @Column("varchar", { name: "updateTime", nullable: true }) //수정날짜
  updateTime: string;

  @Column("varchar", { name: "playTime", nullable: true, length: 45 })
  playTime: string;

  @Column("boolean", { name: "pick", nullable: true })
  pick: boolean | null;

  @Column("boolean", { name: "priority" })
  priority: boolean;

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

  //device(1) <-> setting(N)
  @ManyToOne(() => DeviceModel, (device) => device.slave, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: DeviceModel;

  @ManyToOne(() => DeviceSlaveModel, (slave) => slave.settings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  slave: DeviceSlaveModel;
}
