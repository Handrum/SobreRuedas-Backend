import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InvitacionAsesor} from '../models';
import {InvitacionAsesorRepository} from '../repositories';

export class InvitacionAsesorController {
  constructor(
    @repository(InvitacionAsesorRepository)
    public invitacionAsesorRepository : InvitacionAsesorRepository,
  ) {}

  @post('/Invitacion-Asesores')
  @response(200, {
    description: 'InvitacionAsesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvitacionAsesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {
            title: 'NewInvitacionAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    invitacionAsesor: Omit<InvitacionAsesor, 'id'>,
  ): Promise<InvitacionAsesor> {
    return this.invitacionAsesorRepository.create(invitacionAsesor);
  }

  @get('/Invitacion-Asesores/count')
  @response(200, {
    description: 'InvitacionAsesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvitacionAsesor) where?: Where<InvitacionAsesor>,
  ): Promise<Count> {
    return this.invitacionAsesorRepository.count(where);
  }

  @get('/Invitacion-Asesores')
  @response(200, {
    description: 'Array of InvitacionAsesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvitacionAsesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvitacionAsesor) filter?: Filter<InvitacionAsesor>,
  ): Promise<InvitacionAsesor[]> {
    return this.invitacionAsesorRepository.find(filter);
  }

  @patch('/Invitacion-Asesores')
  @response(200, {
    description: 'InvitacionAsesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {partial: true}),
        },
      },
    })
    invitacionAsesor: InvitacionAsesor,
    @param.where(InvitacionAsesor) where?: Where<InvitacionAsesor>,
  ): Promise<Count> {
    return this.invitacionAsesorRepository.updateAll(invitacionAsesor, where);
  }

  @get('/Invitacion-Asesores/{id}')
  @response(200, {
    description: 'InvitacionAsesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvitacionAsesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InvitacionAsesor, {exclude: 'where'}) filter?: FilterExcludingWhere<InvitacionAsesor>
  ): Promise<InvitacionAsesor> {
    return this.invitacionAsesorRepository.findById(id, filter);
  }

  @patch('/Invitacion-Asesores/{id}')
  @response(204, {
    description: 'InvitacionAsesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionAsesor, {partial: true}),
        },
      },
    })
    invitacionAsesor: InvitacionAsesor,
  ): Promise<void> {
    await this.invitacionAsesorRepository.updateById(id, invitacionAsesor);
  }

  @put('/Invitacion-Asesores/{id}')
  @response(204, {
    description: 'InvitacionAsesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() invitacionAsesor: InvitacionAsesor,
  ): Promise<void> {
    await this.invitacionAsesorRepository.replaceById(id, invitacionAsesor);
  }

  @del('/Invitacion-Asesores/{id}')
  @response(204, {
    description: 'InvitacionAsesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.invitacionAsesorRepository.deleteById(id);
  }
}
