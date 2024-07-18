import { TipoConta } from 'src/enums/tipoConta.enum';
export class Conta {
  constructor(
    public id: string,
    public gerenteId: string,
    public idCliente: string,
    public saldo: number,
    public tipo: TipoConta,
    public limiteChequeEspecial?: number,
  ) {}

  temSaldoSuficiente(valor: number): boolean {
    if (this.tipo === TipoConta.CORRENTE) {
      return this.saldo + this.limiteChequeEspecial >= valor;
    }
    return this.saldo >= valor;
  }

  realizarPagamento(valor: number): boolean {
    if (!this.temSaldoSuficiente(valor)) {
      return false;
    }
    this.saldo -= valor;
    return true;
  }

  pagarPorPix(valor: number): boolean {
    return this.realizarPagamento(valor);
  }

  pagarPorBoleto(valor: number): boolean {
    return this.realizarPagamento(valor);
  }
}
