import {Entity, model, property} from '@loopback/repository';

@model()
export class ConcesionarioParametros extends Entity {
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
  Correo_contacto: string;


  constructor(data?: Partial<ConcesionarioParametros>) {
    super(data);
  }
}

export interface ConcesionarioParametrosRelations {
  // describe navigational properties here
}

export type ConcesionarioParametrosWithRelations = ConcesionarioParametros & ConcesionarioParametrosRelations;
