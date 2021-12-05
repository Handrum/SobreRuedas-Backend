import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CondicionVehiculo, CondicionVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CondicionVehiculoRepository extends DefaultCrudRepository<
  CondicionVehiculo,
  typeof CondicionVehiculo.prototype.id,
  CondicionVehiculoRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof CondicionVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CondicionVehiculo, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
