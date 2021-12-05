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
import {EstadoAsesor} from '../models';
import {EstadoAsesorRepository} from '../repositories';

export class EstadoAsesorController {
  constructor(
    @repository(EstadoAsesorRepository)
    public estadoAsesorRepository : EstadoAsesorRepository,
  ) {}

  @post('/Estado-Asesores')
  @response(200, {
    description: 'EstadoAsesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoAsesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsesor, {
            title: 'NewEstadoAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoAsesor: Omit<EstadoAsesor, 'id'>,
  ): Promise<EstadoAsesor> {
    return this.estadoAsesorRepository.create(estadoAsesor);
  }

  @get('/Estado-Asesores/count')
  @response(200, {
    description: 'EstadoAsesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoAsesor) where?: Where<EstadoAsesor>,
  ): Promise<Count> {
    return this.estadoAsesorRepository.count(where);
  }

  @get('/Estado-Asesores')
  @response(200, {
    description: 'Array of EstadoAsesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoAsesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoAsesor) filter?: Filter<EstadoAsesor>,
  ): Promise<EstadoAsesor[]> {
    return this.estadoAsesorRepository.find(filter);
  }

  @patch('/Estado-Asesores')
  @response(200, {
    description: 'EstadoAsesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsesor, {partial: true}),
        },
      },
    })
    estadoAsesor: EstadoAsesor,
    @param.where(EstadoAsesor) where?: Where<EstadoAsesor>,
  ): Promise<Count> {
    return this.estadoAsesorRepository.updateAll(estadoAsesor, where);
  }

  @get('/Estado-Asesores/{id}')
  @response(200, {
    description: 'EstadoAsesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoAsesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoAsesor, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoAsesor>
  ): Promise<EstadoAsesor> {
    return this.estadoAsesorRepository.findById(id, filter);
  }

  @patch('/Estado-Asesores/{id}')
  @response(204, {
    description: 'EstadoAsesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsesor, {partial: true}),
        },
      },
    })
    estadoAsesor: EstadoAsesor,
  ): Promise<void> {
    await this.estadoAsesorRepository.updateById(id, estadoAsesor);
  }

  @put('/Estado-Asesores/{id}')
  @response(204, {
    description: 'EstadoAsesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoAsesor: EstadoAsesor,
  ): Promise<void> {
    await this.estadoAsesorRepository.replaceById(id, estadoAsesor);
  }

  @del('/Estado-Asesores/{id}')
  @response(204, {
    description: 'EstadoAsesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoAsesorRepository.deleteById(id);
  }
}
