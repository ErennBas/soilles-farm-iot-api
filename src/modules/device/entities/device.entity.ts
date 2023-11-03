import { Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { DataEntity } from '../../data/entities/data.entity';

@Entity('device')
export class DeviceEntity {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', default: '' })
    name: string;

    @Column({ type: 'text' })
    uuid: string;

    @Column({ type: 'text' })
    macId: string;

    @Column({ type: 'text' })
    localIp: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @OneToMany(() => DataEntity, (data) => data.device)
    datas: DataEntity[]
}