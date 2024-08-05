
// payments.module.ts
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],

})
export class PaymentsModule {}
