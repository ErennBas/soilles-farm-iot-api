import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataGateway } from './data.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataEntity])
  ],
  controllers: [DataController],
  providers: [DataService, DataGateway],
})
export class DataModule {}
