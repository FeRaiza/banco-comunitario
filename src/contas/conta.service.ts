import { TipoConta } from './../enums/tipoConta.enum';
import { Injectable } from '@nestjs/common';
import { Conta } from './entities/conta.entity';
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../cliente/entities/cliente.entity';

@Injectable()
export class ContasService {
  private contas: Conta[] = [];

  criarConta(cliente: Cliente, tipo: TipoConta): Conta {
    const novaConta: Conta = {
      id: uuidv4(),
      tipo,
      saldo: 0,
      limiteChequeEspecial: tipo === TipoConta.CORRENTE ? 100 : undefined,
      gerenteId: '',
      idCliente: '',
    };
    this.contas.push(novaConta);
    cliente.contas.push(novaConta);
    return novaConta;
  }

  listarContas(): Conta[] {
    return this.contas;
  }

  buscarContaPorId(id: string): Conta {
    return this.contas.find((conta) => conta.id === id);
  }

  depositar(id: string, valor: number): Conta {
    const conta = this.buscarContaPorId(id);
    if (conta) {
      conta.saldo += valor;
    }
    return conta;
  }

  sacar(id: string, valor: number): Conta {
    const conta = this.buscarContaPorId(id);
    if (conta) {
      const saldoDisponivel = conta.saldo + (conta.limiteChequeEspecial || 0);
      if (saldoDisponivel >= valor) {
        conta.saldo -= valor;
      } else {
        throw new Error('Saldo insuficiente');
      }
    }
    return conta;
  }

  transferir(
    idOrigem: string,
    idDestino: string,
    valor: number,
  ): { contaOrigem: Conta; contaDestino: Conta } {
    const contaOrigem = this.sacar(idOrigem, valor);
    const contaDestino = this.depositar(idDestino, valor);
    return { contaOrigem, contaDestino };
  }

  removerConta(id: string): void {
    this.contas = this.contas.filter((conta) => conta.id !== id);
  }

  pagarPorPix(id: string, valor: number): Conta {
    const conta = this.buscarContaPorId(id);
    if (!conta.pagarPorPix(valor)) {
      throw new Error('Saldo insuficiente');
    }
    return conta;
  }

  pagarPorBoleto(id: string, valor: number): Conta {
    const conta = this.buscarContaPorId(id);
    if (!conta.pagarPorBoleto(valor)) {
      throw new Error('Saldo insuficiente');
    }
    return conta;
  }
}
