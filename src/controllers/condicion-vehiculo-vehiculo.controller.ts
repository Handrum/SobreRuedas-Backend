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
  CondicionVehiculo,
  Vehiculo,
} from '../models';
import {CondicionVehiculoRepository} from '../repositories';

export class CondicionVehiculoVehiculoController {
  constructor(
    @repository(CondicionVehiculoRepository) protected condicionVehiculoRepository: CondicionVehiculoRepository,
  ) { }

  @get('/condicion-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of CondicionVehiculo has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.condicionVehiculoRepository.vehiculos(id).find(filter);
  }

  @post('/condicion-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CondicionVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CondicionVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCondicionVehiculo',
            exclude: ['id'],
            optional: ['condicionVehiculoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.condicionVehiculoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/condicion-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CondicionVehiculo.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.condicionVehiculoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/condicion-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CondicionVehiculo.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.condicionVehiculoRepository.vehiculos(id).delete(where);
  }
}
