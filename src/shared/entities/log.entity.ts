import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  areaid: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
