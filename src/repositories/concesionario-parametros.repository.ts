import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ConcesionarioParametros, ConcesionarioParametrosRelations} from '../models';

export class ConcesionarioParametrosRepository extends DefaultCrudRepository<
  ConcesionarioParametros,
  typeof ConcesionarioParametros.prototype.id,
  ConcesionarioParametrosRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(ConcesionarioParametros, dataSource);
  }
}
