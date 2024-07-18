import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ContaModule } from './contas/conta.module';
import { TransacoesModule } from './transactions/transactions.module';
import { GerenteModule } from './gerente/gerente.module';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule, TransacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
