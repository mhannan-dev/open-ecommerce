import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';

@Module({
  providers: [VendorsService],
  controllers: [VendorsController]
})
export class VendorsModule {}
