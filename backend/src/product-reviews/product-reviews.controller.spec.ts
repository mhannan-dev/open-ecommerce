import { Test, TestingModule } from '@nestjs/testing';
import { ProductReviewsController } from './product-reviews.controller';

describe('ProductReviewsController', () => {
  let controller: ProductReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductReviewsController],
    }).compile();

    controller = module.get<ProductReviewsController>(ProductReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
