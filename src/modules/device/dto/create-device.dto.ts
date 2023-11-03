import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { EErrors } from "../../../common/enums";

export class CreateDeviceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.WATER_TEMPERATURE_REQUIRED })
    uuid: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.WATER_TEMPERATURE_REQUIRED })
    macId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.WATER_TEMPERATURE_REQUIRED })
    localId: string;
}
