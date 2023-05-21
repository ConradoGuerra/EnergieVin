import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wines')
export default class Wine {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
