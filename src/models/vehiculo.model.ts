import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Asesor} from './asesor.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Sucursal} from './sucursal.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Estado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'number',
    required: true,
  })
  Modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  Referencia: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @property({
    type: 'string',
    required: true,
  })
  URL_Foto: string;

  @property({
    type: 'string',
    required: true,
  })
  URL_YouTube: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @property({
    type: 'string',
  })
  condicionVehiculoId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
