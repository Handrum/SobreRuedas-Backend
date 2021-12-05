import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {InvitacionAsesor, InvitacionAsesorRelations, Administrador, Asesor} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class InvitacionAsesorRepository extends DefaultCrudRepository<
  InvitacionAsesor,
  typeof InvitacionAsesor.prototype.id,
  InvitacionAsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof InvitacionAsesor.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof InvitacionAsesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(InvitacionAsesor, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
