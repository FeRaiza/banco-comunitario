import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './cliente/cliente.module';
import { BankAccountModule } from './contas/conta.module';
import { ManagerModule } from './gerente/gerente.module';
import { TransactionsModule } from './transactions/transactions.module';
// import { Cliente } from './cliente/entities/cliente.entity';
// import { Conta } from './contas/entities/conta.entity';
// import { Gerente } from './gerente/entities/gerente.entity';

@Module({
  imports: [
    CustomerModule,
    BankAccountModule,
    ManagerModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
