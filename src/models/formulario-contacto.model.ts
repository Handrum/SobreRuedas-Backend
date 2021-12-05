import {Entity, model, property} from '@loopback/repository';

@model()
export class FormularioContacto extends Entity {
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
  Nombre_completo: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo_electronico: string;

  @property({
    type: 'string',
    required: false,
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  Mensaje: string;


  constructor(data?: Partial<FormularioContacto>) {
    super(data);
  }
}

export interface FormularioContactoRelations {
  // describe navigational properties here
}

export type FormularioContactoWithRelations = FormularioContacto & FormularioContactoRelations;
