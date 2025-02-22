import { Order } from 'orders/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity('shippings')
export class Shipping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    trackingNumber: string;

    @Column()
    shippingCarrier: string;

    @Column()
    shippingMethod: string;

    @Column({ type: 'date' })
    shippingDate: string;

    @Column({ type: 'date' })
    estimatedArrivalDate: string;

    @Column({ type: 'varchar', length: 255 })
    shippingAddress: string;

    @ManyToOne(() => Order, (order) => order.shippings)
    order: Order;
}
