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
  Asesor,
  InvitacionAsesor,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorInvitacionAsesorController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Array of Asesor has many InvitacionAsesor',
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
    return this.asesorRepository.invitacionAsesors(id).find(filter);
  }

  @post('/asesors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(InvitacionAsesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {
            title: 'NewInvitacionAsesorInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) invitacionAsesor: Omit<InvitacionAsesor, 'id'>,
  ): Promise<InvitacionAsesor> {
    return this.asesorRepository.invitacionAsesors(id).create(invitacionAsesor);
  }

  @patch('/asesors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Asesor.InvitacionAsesor PATCH success count',
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
    return this.asesorRepository.invitacionAsesors(id).patch(invitacionAsesor, where);
  }

  @del('/asesors/{id}/invitacion-asesors', {
    responses: {
      '200': {
        description: 'Asesor.InvitacionAsesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InvitacionAsesor)) where?: Where<InvitacionAsesor>,
  ): Promise<Count> {
    return this.asesorRepository.invitacionAsesors(id).delete(where);
  }
}
