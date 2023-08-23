import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsEmpty,
  ValidateIf,
  IsBoolean,
} from "class-validator";

//slave id
export enum slaveID {
  DOOR = 2, // 포트 1번
  AIR_PURIFIER = 7, // 포트 2번
  LIGHT_INNER = 1, // 포트 7번
  LIGHT_OUTER = 3, // 포트 8번
  AWNING = -1,
  BLIEND = -1,
}

export class setCoilDto {
  @ApiProperty({ description: "coil address" })
  @IsNumber()
  address: number;

  @ApiProperty({ description: "coil value true/false" })
  @IsBoolean()
  value: boolean;
}

export class getCoilDto {
  @ApiProperty({ description: "coil address" })
  @IsNumber()
  address: number;

  @ApiProperty({ description: "coil lenght 0~8" })
  @IsNumber()
  lenght: number;
}

export class setResisterDto {
  @ApiProperty({ description: "resister address" })
  @IsNumber()
  address: number;

  @ApiProperty({ description: "resister value" })
  @IsNumber()
  value: number;
}
