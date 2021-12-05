import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Solicitud, Asesor, TipoVehiculo, Sucursal} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {AsesorRepository} from './asesor.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {SucursalRepository} from './sucursal.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.id>;

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
