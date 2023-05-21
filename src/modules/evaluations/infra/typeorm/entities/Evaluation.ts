import User from '@modules/user/infra/typeorm/entities/User';
import Wine from '@modules/wine/infra/typeorm/entities/Wine';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evaluations')
export default class Evaluation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Wine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wineId' })
  wineId: number;

  @Column()
  grade: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
