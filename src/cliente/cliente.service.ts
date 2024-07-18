import { Injectable } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientesService {
  private clientes: Cliente[] = [];

  criarCliente(cliente: Omit<Cliente, 'id' | 'contas' | 'gerente'>): Cliente {
    const novoCliente = { ...cliente, id: uuidv4(), contas: [], gerente: null };
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  buscarClientePorId(id: string): Cliente {
    return this.clientes.find((cliente) => cliente.id === id);
  }

  atualizarCliente(id: string, dadosAtualizados: Partial<Cliente>): Cliente {
    const cliente = this.buscarClientePorId(id);
    if (cliente) {
      Object.assign(cliente, dadosAtualizados);
    }
    return cliente;
  }
}
