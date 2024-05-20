import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';


@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conta: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  saldo: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}