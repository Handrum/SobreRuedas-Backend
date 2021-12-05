import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Sucursal} from './sucursal.model';
import {Departamento} from './departamento.model';

@model()
export class Ciudad extends Entity {
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
  Nombre: string;

  @hasMany(() => Sucursal)
  sucursals: Sucursal[];

  @belongsTo(() => Departamento)
  departamentoId: string;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
