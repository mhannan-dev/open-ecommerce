import { Order } from 'orders/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    is_active: boolean;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];
}
