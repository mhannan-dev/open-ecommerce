import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @Column({ nullable: true })
  can_login: boolean;

  @Column({ nullable: true })
  image: string;
}
