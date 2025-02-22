import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';

@Module({
  providers: [ProductVariantsService],
  controllers: [ProductVariantsController]
})
export class ProductVariantsModule {}
