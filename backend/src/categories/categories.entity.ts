import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    parent_id: number;

    @Column({ nullable: true, length: 255 }) 
    slug: string;

    @Column()
    name: string;

    @Column({ nullable: true, length: 50 })
    type: string;

    @Column({ default: true })
    is_active: boolean;
}
