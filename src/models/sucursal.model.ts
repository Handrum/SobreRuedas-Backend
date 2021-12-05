import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Ciudad} from './ciudad.model';

@model()
export class Sucursal extends Entity {
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
  Nombre_Sucursal: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Ciudad)
  ciudadId: string;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
