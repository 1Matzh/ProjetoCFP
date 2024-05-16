import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accounts } from 'src/accounts/entity/accounts.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 40 })
  nome: string;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Accounts, (accounts) => accounts.user)
  accounts: Accounts[];
}
