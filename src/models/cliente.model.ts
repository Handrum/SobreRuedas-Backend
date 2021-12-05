import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'string',
    required: true,
  })
  Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_completo: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
