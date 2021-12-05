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
import {ConcesionarioParametros} from '../models';
import {ConcesionarioParametrosRepository} from '../repositories';

export class ConcesionarioParametrosController {
  constructor(
    @repository(ConcesionarioParametrosRepository)
    public concesionarioParametrosRepository : ConcesionarioParametrosRepository,
  ) {}

  @post('/concesionario-parametros')
  @response(200, {
    description: 'ConcesionarioParametros model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConcesionarioParametros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConcesionarioParametros, {
            title: 'NewConcesionarioParametros',
            exclude: ['id'],
          }),
        },
      },
    })
    concesionarioParametros: Omit<ConcesionarioParametros, 'id'>,
  ): Promise<ConcesionarioParametros> {
    return this.concesionarioParametrosRepository.create(concesionarioParametros);
  }

  @get('/concesionario-parametros/count')
  @response(200, {
    description: 'ConcesionarioParametros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConcesionarioParametros) where?: Where<ConcesionarioParametros>,
  ): Promise<Count> {
    return this.concesionarioParametrosRepository.count(where);
  }

  @get('/concesionario-parametros')
  @response(200, {
    description: 'Array of ConcesionarioParametros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConcesionarioParametros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConcesionarioParametros) filter?: Filter<ConcesionarioParametros>,
  ): Promise<ConcesionarioParametros[]> {
    return this.concesionarioParametrosRepository.find(filter);
  }

  @patch('/concesionario-parametros')
  @response(200, {
    description: 'ConcesionarioParametros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConcesionarioParametros, {partial: true}),
        },
      },
    })
    concesionarioParametros: ConcesionarioParametros,
    @param.where(ConcesionarioParametros) where?: Where<ConcesionarioParametros>,
  ): Promise<Count> {
    return this.concesionarioParametrosRepository.updateAll(concesionarioParametros, where);
  }

  @get('/concesionario-parametros/{id}')
  @response(200, {
    description: 'ConcesionarioParametros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConcesionarioParametros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ConcesionarioParametros, {exclude: 'where'}) filter?: FilterExcludingWhere<ConcesionarioParametros>
  ): Promise<ConcesionarioParametros> {
    return this.concesionarioParametrosRepository.findById(id, filter);
  }

  @patch('/concesionario-parametros/{id}')
  @response(204, {
    description: 'ConcesionarioParametros PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConcesionarioParametros, {partial: true}),
        },
      },
    })
    concesionarioParametros: ConcesionarioParametros,
  ): Promise<void> {
    await this.concesionarioParametrosRepository.updateById(id, concesionarioParametros);
  }

  @put('/concesionario-parametros/{id}')
  @response(204, {
    description: 'ConcesionarioParametros PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() concesionarioParametros: ConcesionarioParametros,
  ): Promise<void> {
    await this.concesionarioParametrosRepository.replaceById(id, concesionarioParametros);
  }

  @del('/concesionario-parametros/{id}')
  @response(204, {
    description: 'ConcesionarioParametros DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.concesionarioParametrosRepository.deleteById(id);
  }
}
