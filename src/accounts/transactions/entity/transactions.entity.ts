import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Accounts } from '../../entity/accounts.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Accounts, account => account.transactions)
  account: Accounts;
}
