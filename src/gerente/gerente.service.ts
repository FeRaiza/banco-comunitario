import { ContasService } from './../contas/conta.service';
import { TipoConta } from './../enums/tipoConta.enum';
import { Injectable } from '@nestjs/common';
import { Gerente } from './entities/gerente.entity';
import { Cliente } from '.././cliente/entities/cliente.entity';
import { v4 as uuidv4 } from 'uuid';
import { Conta } from 'src/contas/entities/conta.entity';

@Injectable()
export class GerentesService {
  private gerentes: Gerente[] = [];

  constructor(private contasService: ContasService) {}

  criarGerente(gerente: Omit<Gerente, 'id' | 'clientes'>): Gerente {
    const novoGerente = { ...gerente, id: uuidv4(), clientes: [] };
    this.gerentes.push(novoGerente);
    return novoGerente;
  }

  listarGerentes(): Gerente[] {
    return this.gerentes;
  }

  buscarGerentePorId(id: string): Gerente {
    return this.gerentes.find((gerente) => gerente.id === id);
  }

  adicionarCliente(idGerente: string, cliente: Cliente): Gerente {
    const gerente = this.buscarGerentePorId(idGerente);
    if (gerente) {
      gerente.clientes.push(cliente);
      cliente.gerente = gerente;
    }
    return gerente;
  }

  removerCliente(idGerente: string, idCliente: string): Gerente {
    const gerente = this.buscarGerentePorId(idGerente);
    if (gerente) {
      gerente.clientes = gerente.clientes.filter(
        (cliente) => cliente.id !== idCliente,
      );
    }
    return gerente;
  }

  abrirConta(idGerente: string, idCliente: string, tipo: TipoConta): Conta {
    const gerente = this.buscarGerentePorId(idGerente);
    const cliente = gerente.clientes.find(
      (cliente) => cliente.id === idCliente,
    );
    if (cliente) {
      return this.contasService.criarConta(cliente, tipo);
    }
    throw new Error('Cliente não encontrado');
  }

  fecharConta(idGerente: string, idConta: string): Gerente {
    const gerente = this.buscarGerentePorId(idGerente);
    gerente.clientes.forEach((cliente) => {
      cliente.contas = cliente.contas.filter((conta) => conta.id !== idConta);
    });
    this.contasService.removerConta(idConta); // Assumindo que o método removerConta está disponível no ContasService
    return gerente;
  }

  modificarTipoConta(
    idGerente: string,
    idConta: string,
    novoTipo: TipoConta,
  ): Conta {
    const conta = this.contasService.buscarContaPorId(idConta);
    if (conta) {
      conta.tipo = novoTipo;
      conta.limiteChequeEspecial =
        novoTipo === TipoConta.CORRENTE ? 100 : undefined;
    }
    return conta;
  }
}
