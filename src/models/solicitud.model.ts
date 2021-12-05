import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';
import {EstadoSolicitud} from './estado-solicitud.model';

@model()
export class Solicitud extends Entity {
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
  Fecha_Solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  URL_Cotizacion: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
