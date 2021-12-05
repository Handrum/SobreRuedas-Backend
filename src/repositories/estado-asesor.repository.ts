import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadoAsesor, EstadoAsesorRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class EstadoAsesorRepository extends DefaultCrudRepository<
  EstadoAsesor,
  typeof EstadoAsesor.prototype.id,
  EstadoAsesorRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof EstadoAsesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(EstadoAsesor, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
