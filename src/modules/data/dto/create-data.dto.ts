import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EErrors } from '../../../common/enums';

export class CreateDataDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: EErrors.WATER_TEMPERATURE_REQUIRED })
    waterTemperature: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: EErrors.WEATHER_TEMPERATURE_REQUIRED })
    weatherTemperature: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: EErrors.MOISTURE_REQUIRED })
    moisture: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: EErrors.UUID_REQUIRED })
    uuid: string;
}
