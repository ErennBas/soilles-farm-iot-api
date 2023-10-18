import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('data')
export class DataEntity {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'decimal', precision: 2 })
    moisture: number;

    @Column({ type: 'decimal', precision: 2 })
    waterTemperature: number;

    @Column({ type: 'decimal', precision: 2 })
    weatherTemperature: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
