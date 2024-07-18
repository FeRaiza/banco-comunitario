import { Module } from '@nestjs/common';
import { ContasService } from './conta.service';
import { ContasController } from './conta.controller';

@Module({
  providers: [ContasService],
  controllers: [ContasController],
})
export class BankAccountModule {}
