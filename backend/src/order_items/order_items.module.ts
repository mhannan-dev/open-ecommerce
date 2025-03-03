import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';

@Module({
  providers: [OrderItemsService],
  controllers: [OrderItemsController]
})
export class OrderItemsModule {}
