import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { DeviceEntity } from '../../device/entities/device.entity';

@Entity('data')
export class DataEntity {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    moisture: number;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    waterTemperature: number;

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    weatherTemperature: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ManyToOne(() => DeviceEntity, (user) => user.datas)
    device: DeviceEntity
}