import { Module } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransacoesModule {}
