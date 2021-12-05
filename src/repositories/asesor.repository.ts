import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Asesor, AsesorRelations, InvitacionAsesor, Solicitud, EstadoAsesor, Vehiculo} from '../models';
import {InvitacionAsesorRepository} from './invitacion-asesor.repository';
import {SolicitudRepository} from './solicitud.repository';
import {EstadoAsesorRepository} from './estado-asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly invitacionAsesors: HasManyRepositoryFactory<InvitacionAsesor, typeof Asesor.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  public readonly estadoAsesor: BelongsToAccessor<EstadoAsesor, typeof Asesor.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('InvitacionAsesorRepository') protected invitacionAsesorRepositoryGetter: Getter<InvitacionAsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('EstadoAsesorRepository') protected estadoAsesorRepositoryGetter: Getter<EstadoAsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Asesor, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.estadoAsesor = this.createBelongsToAccessorFor('estadoAsesor', estadoAsesorRepositoryGetter,);
    this.registerInclusionResolver('estadoAsesor', this.estadoAsesor.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.invitacionAsesors = this.createHasManyRepositoryFactoryFor('invitacionAsesors', invitacionAsesorRepositoryGetter,);
    this.registerInclusionResolver('invitacionAsesors', this.invitacionAsesors.inclusionResolver);
  }
}
