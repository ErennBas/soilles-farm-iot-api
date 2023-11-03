import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { EErrors } from "../../../common/enums";

export class CreateDeviceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.UUID_REQUIRED })
    uuid: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.MAC_ID_REQUIRED })
    macId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.LOCAL_ID_REQUIRED })
    localIp: string;
}
