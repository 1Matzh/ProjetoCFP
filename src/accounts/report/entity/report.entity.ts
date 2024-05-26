import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  analysisType: string;

  // Outras propriedades para armazenar dados do relatório, como saldo atual, total de despesas, total de receitas, distribuição de despesas, etc.
}