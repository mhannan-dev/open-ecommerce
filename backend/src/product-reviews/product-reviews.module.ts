import { Module } from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';
import { ProductReviewsController } from './product-reviews.controller';

@Module({
  providers: [ProductReviewsService],
  controllers: [ProductReviewsController]
})
export class ProductReviewsModule {}
