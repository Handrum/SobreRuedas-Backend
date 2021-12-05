import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model()
export class InvitacionAsesor extends Entity {
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
  Hash: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<InvitacionAsesor>) {
    super(data);
  }
}

export interface InvitacionAsesorRelations {
  // describe navigational properties here
}

export type InvitacionAsesorWithRelations = InvitacionAsesor & InvitacionAsesorRelations;
