import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule {}
