import { TipoPagamento } from './../../enums/tipoPagamento.enum';
export class Transacoes {
  id: string;
  valor: number;
  tipo: TipoPagamento;
  descricao: string;
  clienteId: string;
}
