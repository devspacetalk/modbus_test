import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsEmpty,
  ValidateIf,
  IsBoolean,
} from "class-validator";

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
