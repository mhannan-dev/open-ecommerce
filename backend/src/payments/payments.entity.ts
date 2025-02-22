import { Order } from 'orders/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.payments)
    @JoinColumn({ name: 'order_id' })
    order: Order; 

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number; 

    @Column({ type: 'varchar', length: 50 })
    payment_method: string; 

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    payment_status: string; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    payment_date: Date; 

    @Column({ type: 'varchar', length: 255, nullable: true })
    transaction_id: string | null; 

    @Column({ type: 'varchar', length: 255, nullable: true })
    payment_gateway: string | null;

    @Column({ type: 'text', nullable: true })
    payment_notes: string | null;
}
