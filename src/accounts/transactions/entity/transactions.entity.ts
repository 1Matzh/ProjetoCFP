import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Accounts } from '../../entity/accounts.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valor: number;

  @Column()
  descricao: string;

  @Column()
  categoria: string;

  @CreateDateColumn()
  data: Date;

  @ManyToOne(() => Accounts, account => account.transactions)
  account: Accounts;
}
