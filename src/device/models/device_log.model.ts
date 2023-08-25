import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceModel } from "./device.model";

//Device 동작여부 로그 저장 과거 내역 조회 사용 수정중
@Entity("tbl_device_log")
export class DeviceLogModel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "deviceId" })
  deviceId: number;

  @Column("boolean", { name: "isOn", nullable: true, default: null })
  isOn: boolean;

  @Column("varchar", { name: "situation", nullable: true, length: 45 })
  situation: string | null;

  @Column("varchar", { name: "reason", nullable: true, length: 45 })
  reason: string | null;

  @Column("float", { nullable: true })
  latitude: number | null;
  @Column("float", { nullable: true })
  longitude: number | null;
  @Column("varchar", { nullable: true })
  locationAddr: string | null;
  @Column("float", { nullable: true })
  temperature: number | null;
  @Column("datetime", { nullable: true })
  refreshTime: Date | null;
  @Column("float", { nullable: true })
  weatherCode: number | null;
  @Column("varchar", { nullable: true })
  weatherDescription: string | null;
  @Column("varchar", { nullable: true })
  wind_information: string | null;
  @Column("varchar", { nullable: true })
  wind_speed: string | null;
  @Column("float", { nullable: true })
  Humidity: number | null;
  @Column("float", { nullable: true })
  pm10Value: number | null;
  @Column("float", { nullable: true })
  pm10Grade: number | null;
  @Column("float", { nullable: true })
  pm25Value: number | null;
  @Column("float", { nullable: true })
  pm25Grade: number | null;
  @Column("float", { nullable: true })
  khaiValue: number | null;
  @Column("float", { nullable: true })
  khaiGrade: number | null;
  @Column("float", { nullable: true })
  coValue: number | null;
  @Column("float", { nullable: true })
  coGrade: number | null;
  @Column("float", { nullable: true })
  no2Value: number | null;
  @Column("float", { nullable: true })
  no2Grade: number | null;
  @Column("float", { nullable: true })
  o3Value: number | null;
  @Column("float", { nullable: true })
  o3Grade: number | null;

  @Column("boolean", { nullable: true })
  rainFlag: boolean | null;

  @Column("boolean", { nullable: true })
  snowFlag: boolean | null;

  @Column("boolean", { nullable: true })
  movement: boolean | null;

  @Column("varchar", { name: "authCode", nullable: true, length: 45 })
  authCode: string;

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

  // @ManyToOne(
  //   () => DeviceModel,
  //   device => device.log,
  //   {
  //     onDelete: "CASCADE",
  //     onUpdate: "CASCADE",
  //   },
  // )
  // @JoinColumn([{ name: 'deviceId', referencedColumnName: 'id' }])
  // device: DeviceModel;
}
