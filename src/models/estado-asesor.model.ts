import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class EstadoAsesor extends Entity {
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
  Estado_Asesor: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  constructor(data?: Partial<EstadoAsesor>) {
    super(data);
  }
}

export interface EstadoAsesorRelations {
  // describe navigational properties here
}

export type EstadoAsesorWithRelations = EstadoAsesor & EstadoAsesorRelations;
