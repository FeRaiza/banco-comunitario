import { Conta } from './../contas/entities/conta.entity';
import { ContasService } from 'src/contas/conta.service';

export class transacaoBoleto extends Conta {
  pagar(id: string, valor: number, conta: ContasService): void {
    conta.sacar(id, valor);
  }
}
