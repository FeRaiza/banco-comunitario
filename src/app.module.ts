import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cliente } from './cliente/entities/cliente.entity';
import { Conta } from './contas/entities/conta.entity';
import { Gerente } from './gerente/entities/gerente.entity';

@Module({
  imports: [Cliente, Conta, Gerente],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
