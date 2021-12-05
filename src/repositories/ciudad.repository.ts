import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Sucursal, Departamento} from '../models';
import {SucursalRepository} from './sucursal.repository';
import {DepartamentoRepository} from './departamento.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly sucursals: HasManyRepositoryFactory<Sucursal, typeof Ciudad.prototype.id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.sucursals = this.createHasManyRepositoryFactoryFor('sucursals', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursals', this.sucursals.inclusionResolver);
  }
}
