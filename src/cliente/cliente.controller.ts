import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';

@Controller('/clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post('/criar')
  criarCliente(
    @Body() cliente: Omit<Cliente, 'id' | 'contas' | 'gerente'>,
  ): Cliente {
    return this.clientesService.criarCliente(cliente);
  }

  @Get()
  listarClientes(): Cliente[] {
    return this.clientesService.listarClientes();
  }

  @Get(':id')
  buscarClientePorId(@Param('id') id: string): Cliente {
    return this.clientesService.buscarClientePorId(id);
  }

  @Put(':id')
  atualizarCliente(
    @Param('id') id: string,
    @Body() dadosAtualizados: Partial<Cliente>,
  ): Cliente {
    return this.clientesService.atualizarCliente(id, dadosAtualizados);
  }
}
