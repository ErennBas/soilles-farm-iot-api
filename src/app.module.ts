import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './modules/data/data.module';
import { DataEntity } from './modules/data/entities/data.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.dev`,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.txt',
          level: 'debug',
          maxFiles: 10,
          maxsize: 10000000
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.txt',
          level: 'error',
          maxFiles: 10,
          maxsize: 10000000
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.txt',
          level: 'info',
          maxFiles: 10,
          maxsize: 10000000
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mariadb',
          host: config.get('DATABASE_HOST'),
          port: Number(config.get('DATABASE_PORT')),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [
            DataEntity
          ]
        }
      }
    }),
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
