import { Cliente } from '../../cliente/entities/cliente.entity';

export class Gerente {
  id: string;
  nomeCompleto: string;
  clientes: Cliente[];
}
