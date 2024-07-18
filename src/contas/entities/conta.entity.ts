// src/bank-account/entities/bank-account.entity.ts
import { TipoConta } from 'src/enums/tipoConta.enum';
//import { Cliente } from 'src/cliente/entities/cliente.entity';
export class Conta {
  constructor(
    public id: string,
    public gerenteId: string,
    public idCliente: string,
    public saldo: number,
    public tipo: TipoConta,
    public limiteChequeEspecial?: number,
  ) {}
}
