import { GerentesService } from './gerente.service';
import { Cliente } from '.././cliente/entities/cliente.entity';
import { TipoConta } from './../enums/tipoConta.enum';
import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { Gerente } from './entities/gerente.entity';
import { Conta } from '../contas/entities/conta.entity';

@Controller('gerentes')
export class GerentesController {
  constructor(private readonly gerentesService: GerentesService) {}

  @Post()
  criarGerente(@Body() gerente: Omit<Gerente, 'id' | 'clientes'>): Gerente {
    return this.gerentesService.criarGerente(gerente);
  }

  @Get()
  listarGerentes(): Gerente[] {
    return this.gerentesService.listarGerentes();
  }

  @Get(':id')
  buscarGerentePorId(@Param('id') id: string): Gerente {
    return this.gerentesService.buscarGerentePorId(id);
  }

  @Put(':id/adicionar-cliente')
  adicionarCliente(@Param('id') id: string, @Body() cliente: Cliente): Gerente {
    return this.gerentesService.adicionarCliente(id, cliente);
  }

  @Put(':id/remover-cliente/:idCliente')
  removerCliente(
    @Param('id') id: string,
    @Param('idCliente') idCliente: string,
  ): Gerente {
    return this.gerentesService.removerCliente(id, idCliente);
  }

  @Post(':id/abrir-conta')
  abrirConta(
    @Param('id') id: string,
    @Body('idCliente') idCliente: string,
    @Body('tipo') tipo: TipoConta,
  ): Conta {
    return this.gerentesService.abrirConta(id, idCliente, tipo);
  }

  @Put(':id/fechar-conta/:idConta')
  fecharConta(
    @Param('id') id: string,
    @Param('idConta') idConta: string,
  ): Gerente {
    return this.gerentesService.fecharConta(id, idConta);
  }

  @Put(':id/modificar-tipo-conta/:idConta')
  modificarTipoConta(
    @Param('id') id: string,
    @Param('idConta') idConta: string,
    @Body('tipo') tipo: TipoConta,
  ): Conta {
    return this.gerentesService.modificarTipoConta(id, idConta, tipo);
  }
}
