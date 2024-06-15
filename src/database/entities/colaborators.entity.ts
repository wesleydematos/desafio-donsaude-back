import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Colaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isAllowed: boolean;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 14 })
  documentNumber: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 256, nullable: true })
  photo: string;
}
