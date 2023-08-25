import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceModel } from "./device.model";
import { DeviceSlaveModel } from "./device_slave.model";

@Entity("tbl_device_settings")
export class DeviceSettingModel {
  @PrimaryColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "deviceId" })
  deviceId: number;

  @Column("varchar", { name: "uuid", nullable: true })
  uuid: string;

  @Column("int", { name: "slaveId", nullable: true })
  slaveId: number;

  @Column("varchar", { name: "code", length: 10 })
  code: string;

  //운영 기간/시간 설정 [[ operating_period 운영기간, operating_time 운영시간
  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  //운영 기간/시간 설정 [[ operating_period 운영기간, operating_time 운영시간
  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @Column("varchar", { name: "period_min", nullable: true, length: 4 })
  period_min: string | null;

  @Column("varchar", { name: "period_max", nullable: true, length: 4 })
  period_max: string | null;

  @Column("varchar", { name: "time_min", nullable: true, length: 4 })
  time_min: string | null;

  @Column("varchar", { name: "time_max", nullable: true, length: 4 })
  time_max: string | null;

  @Column("int", { name: "temperature", nullable: true })
  temperature: number;

  @Column("int", { name: "temperature_motion", nullable: true })
  temperature_motion: number;

  @Column("int", { name: "temperature_heat", nullable: true })
  temperature_heat: number;

  @Column("boolean", { name: "motion_used", nullable: true })
  motion_used: boolean | null;

  @Column("int", { name: "humidity", nullable: true })
  humidity: number;

  @Column("int", { name: "wind_speed", nullable: true })
  wind_speed: number;

  @Column("int", { name: "findDust", nullable: true })
  findDust: number;

  @Column("int", { name: "ultrafineDust", nullable: true })
  ultrafineDust: number;

  @Column("int", { name: "color_welcome", nullable: true }) // 사람이 인식되었을떄 색깔
  color_welcome: number;

  @Column("int", { name: "color_device_on", nullable: true }) //운영시간+ 메뉴얼 오픈할때 색깔
  color_device_on: number;

  @Column("int", { name: "color_device_off", nullable: true }) //운영시간, 메뉴얼 off 색깔
  color_device_off: number;

  @Column("int", { name: "color_device_emergency_off", nullable: true }) // 비올때 닫히는 색깔
  color_device_emergency_off: number;

  @Column("int", { name: "color_temperature_up", nullable: true }) //설정한 온도보다 높을떄 색깔
  color_temperature_up: number;

  @Column("int", { name: "color_temperature_down", nullable: true }) //설정한 온도보다 낮을떄 색깔
  color_temperature_down: number;

  @Column("varchar", { name: "smartGlassMode", nullable: true, length: 45 }) // game, video
  smartGlassMode: string | null;

  @Column("varchar", { name: "playMode", nullable: true, length: 45 }) // random, noneName, Pick
  playMode: string | null;

  @Column("varchar", { name: "airMode", nullable: true, length: 45 }) // random, noneName, Pick
  airMode: string | null;

  @Column("varchar", { name: "airWindSpeed", nullable: true, length: 45 }) // random, noneName, Pick
  airWindSpeed: string | null;

  @Column("varchar", { name: "byUserId", nullable: true, length: 45 })
  byUserId?: string;

  @Column("boolean", { name: "monday", nullable: true })
  monday: boolean | null;

  @Column("boolean", { name: "tuesday", nullable: true })
  tuesday: boolean | null;

  @Column("boolean", { name: "wednesday", nullable: true })
  wednesday: boolean | null;

  @Column("boolean", { name: "thursday", nullable: true })
  thursday: boolean | null;

  @Column("boolean", { name: "friday", nullable: true })
  friday: boolean | null;

  @Column("boolean", { name: "saturday", nullable: true })
  saturday: boolean | null;

  @Column("boolean", { name: "sunday", nullable: true })
  sunday: boolean | null;

  @Column("int", { name: "playVolume", nullable: true })
  playVolume: number;

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
