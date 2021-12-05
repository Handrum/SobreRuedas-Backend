import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class CondicionVehiculo extends Entity {
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
  Condicion_Vehiculo: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<CondicionVehiculo>) {
    super(data);
  }
}

export interface CondicionVehiculoRelations {
  // describe navigational properties here
}

export type CondicionVehiculoWithRelations = CondicionVehiculo & CondicionVehiculoRelations;
