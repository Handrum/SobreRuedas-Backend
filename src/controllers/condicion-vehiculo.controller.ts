import {authenticate} from '@loopback/authentication';
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
import {CondicionVehiculo} from '../models';
import {CondicionVehiculoRepository} from '../repositories';

export class CondicionVehiculoController {
  constructor(
    @repository(CondicionVehiculoRepository)
    public condicionVehiculoRepository: CondicionVehiculoRepository,
  ) {}

  @post('/condicion-vehiculos')
  @response(200, {
    description: 'CondicionVehiculo model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(CondicionVehiculo)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionVehiculo, {
            title: 'NewCondicionVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    condicionVehiculo: Omit<CondicionVehiculo, 'id'>,
  ): Promise<CondicionVehiculo> {
    return this.condicionVehiculoRepository.create(condicionVehiculo);
  }

  @get('/condicion-vehiculos/count')
  @response(200, {
    description: 'CondicionVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CondicionVehiculo) where?: Where<CondicionVehiculo>,
  ): Promise<Count> {
    return this.condicionVehiculoRepository.count(where);
  }

  @get('/condicion-vehiculos')
  @response(200, {
    description: 'Array of CondicionVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CondicionVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CondicionVehiculo) filter?: Filter<CondicionVehiculo>,
  ): Promise<CondicionVehiculo[]> {
    return this.condicionVehiculoRepository.find(filter);
  }

  @patch('/condicion-vehiculos')
  @response(200, {
    description: 'CondicionVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionVehiculo, {partial: true}),
        },
      },
    })
    condicionVehiculo: CondicionVehiculo,
    @param.where(CondicionVehiculo) where?: Where<CondicionVehiculo>,
  ): Promise<Count> {
    return this.condicionVehiculoRepository.updateAll(condicionVehiculo, where);
  }

  @get('/condicion-vehiculos/{id}')
  @response(200, {
    description: 'CondicionVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CondicionVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CondicionVehiculo, {exclude: 'where'})
    filter?: FilterExcludingWhere<CondicionVehiculo>,
  ): Promise<CondicionVehiculo> {
    return this.condicionVehiculoRepository.findById(id, filter);
  }

  @patch('/condicion-vehiculos/{id}')
  @response(204, {
    description: 'CondicionVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionVehiculo, {partial: true}),
        },
      },
    })
    condicionVehiculo: CondicionVehiculo,
  ): Promise<void> {
    await this.condicionVehiculoRepository.updateById(id, condicionVehiculo);
  }

  @put('/condicion-vehiculos/{id}')
  @response(204, {
    description: 'CondicionVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() condicionVehiculo: CondicionVehiculo,
  ): Promise<void> {
    await this.condicionVehiculoRepository.replaceById(id, condicionVehiculo);
  }

  @del('/condicion-vehiculos/{id}')
  @response(204, {
    description: 'CondicionVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.condicionVehiculoRepository.deleteById(id);
  }
}
