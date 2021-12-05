import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Administrador, AdministradorRelations, InvitacionAsesor} from '../models';
import {InvitacionAsesorRepository} from './invitacion-asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly invitacionAsesors: HasManyRepositoryFactory<InvitacionAsesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('InvitacionAsesorRepository') protected invitacionAsesorRepositoryGetter: Getter<InvitacionAsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.invitacionAsesors = this.createHasManyRepositoryFactoryFor('invitacionAsesors', invitacionAsesorRepositoryGetter,);
    this.registerInclusionResolver('invitacionAsesors', this.invitacionAsesors.inclusionResolver);
  }
}
