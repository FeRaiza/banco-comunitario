import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { ContasService } from './conta.service';
import { TipoConta } from 'src/enums/tipoConta.enum';
import { Conta } from './entities/conta.entity';
import { ClientesService } from 'src/cliente/cliente.service';

@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private readonly clientesService: ClientesService,
  ) {}

  @Post()
  criarConta(
    @Body('idCliente') idCliente: string,
    @Body('tipo') tipo: TipoConta,
  ): Conta {
    const cliente = this.clientesService.buscarClientePorId(idCliente); // Assumindo que clientesService está disponível aqui
    return this.contasService.criarConta(cliente, tipo);
  }

  @Get()
  listarContas(): Conta[] {
    return this.contasService.listarContas();
  }

  @Get(':id')
  buscarContaPorId(@Param('id') id: string): Conta {
    return this.contasService.buscarContaPorId(id);
  }

  @Put(':id/depositar')
  depositar(@Param('id') id: string, @Body('valor') valor: number): Conta {
    return this.contasService.depositar(id, valor);
  }

  @Put(':id/sacar')
  sacar(@Param('id') id: string, @Body('valor') valor: number): Conta {
    return this.contasService.sacar(id, valor);
  }

  @Put('transferir')
  transferir(
    @Body('idOrigem') idOrigem: string,
    @Body('idDestino') idDestino: string,
    @Body('valor') valor: number,
  ): { contaOrigem: Conta; contaDestino: Conta } {
    return this.contasService.transferir(idOrigem, idDestino, valor);
  }
}
