import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Asesor, Cliente, Vehiculo, EstadoSolicitud} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.estadoSolicitud = this.createBelongsToAccessorFor('estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estadoSolicitud', this.estadoSolicitud.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
