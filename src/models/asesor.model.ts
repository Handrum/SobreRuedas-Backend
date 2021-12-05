import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {InvitacionAsesor} from './invitacion-asesor.model';
import {Solicitud} from './solicitud.model';
import {EstadoAsesor} from './estado-asesor.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Asesor extends Entity {
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

  @hasMany(() => InvitacionAsesor)
  invitacionAsesors: InvitacionAsesor[];

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @belongsTo(() => EstadoAsesor)
  estadoAsesorId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
