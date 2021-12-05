import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class EstadoSolicitud extends Entity {
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
  Estado_Solicitud: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<EstadoSolicitud>) {
    super(data);
  }
}

export interface EstadoSolicitudRelations {
  // describe navigational properties here
}

export type EstadoSolicitudWithRelations = EstadoSolicitud & EstadoSolicitudRelations;
