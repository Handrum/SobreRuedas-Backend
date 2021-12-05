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
  EstadoAsesor,
  Asesor,
} from '../models';
import {EstadoAsesorRepository} from '../repositories';

export class EstadoAsesorAsesorController {
  constructor(
    @repository(EstadoAsesorRepository) protected estadoAsesorRepository: EstadoAsesorRepository,
  ) { }

  @get('/estado-asesors/{id}/asesors', {
    responses: {
      '200': {
        description: 'Array of EstadoAsesor has many Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.estadoAsesorRepository.asesors(id).find(filter);
  }

  @post('/estado-asesors/{id}/asesors', {
    responses: {
      '200': {
        description: 'EstadoAsesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EstadoAsesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInEstadoAsesor',
            exclude: ['id'],
            optional: ['estadoAsesorId']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    return this.estadoAsesorRepository.asesors(id).create(asesor);
  }

  @patch('/estado-asesors/{id}/asesors', {
    responses: {
      '200': {
        description: 'EstadoAsesor.Asesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Partial<Asesor>,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.estadoAsesorRepository.asesors(id).patch(asesor, where);
  }

  @del('/estado-asesors/{id}/asesors', {
    responses: {
      '200': {
        description: 'EstadoAsesor.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.estadoAsesorRepository.asesors(id).delete(where);
  }
}
