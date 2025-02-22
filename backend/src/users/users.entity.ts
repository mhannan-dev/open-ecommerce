import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;


  @Column({ nullable: true })
  can_login: boolean;

  @Column({ nullable: true })
  image: string;
}
