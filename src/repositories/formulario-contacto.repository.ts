import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FormularioContacto, FormularioContactoRelations} from '../models';

export class FormularioContactoRepository extends DefaultCrudRepository<
  FormularioContacto,
  typeof FormularioContacto.prototype.id,
  FormularioContactoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(FormularioContacto, dataSource);
  }
}
