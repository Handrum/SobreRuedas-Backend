import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  InvitacionAsesor,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorInvitacionAsesorController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Array of Administrador has many InvitacionAsesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InvitacionAsesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InvitacionAsesor>,
  ): Promise<InvitacionAsesor[]> {
    return this.administradorRepository.invitacionAsesors(id).find(filter);
  }

  @post('/administradors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(InvitacionAsesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {
            title: 'NewInvitacionAsesorInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) invitacionAsesor: Omit<InvitacionAsesor, 'id'>,
  ): Promise<InvitacionAsesor> {
    return this.administradorRepository.invitacionAsesors(id).create(invitacionAsesor);
  }

  @patch('/administradors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Administrador.InvitacionAsesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {partial: true}),
        },
      },
    })
    invitacionAsesor: Partial<InvitacionAsesor>,
    @param.query.object('where', getWhereSchemaFor(InvitacionAsesor)) where?: Where<InvitacionAsesor>,
  ): Promise<Count> {
    return this.administradorRepository.invitacionAsesors(id).patch(invitacionAsesor, where);
  }

  @del('/administradors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Administrador.InvitacionAsesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InvitacionAsesor)) where?: Where<InvitacionAsesor>,
  ): Promise<Count> {
    return this.administradorRepository.invitacionAsesors(id).delete(where);
  }
}
