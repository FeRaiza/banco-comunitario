import { TipoPagamento } from 'src/enums/tipoPagamento.enum';
import { Gerente } from '../../gerente/entities/gerente.entity';
import { Conta } from 'src/contas/entities/conta.entity';

export class Cliente {
  id: string;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  rendaSalarial: number;
  contas: Conta[];
  gerente: Gerente;
  tipoPagamento: TipoPagamento;
}
