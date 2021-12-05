import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InvitacionAsesor,
  Administrador,
} from '../models';
import {InvitacionAsesorRepository} from '../repositories';

export class InvitacionAsesorAdministradorController {
  constructor(
    @repository(InvitacionAsesorRepository)
    public invitacionAsesorRepository: InvitacionAsesorRepository,
  ) { }

  @get('/invitacion-asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to InvitacionAsesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof InvitacionAsesor.prototype.id,
  ): Promise<Administrador> {
    return this.invitacionAsesorRepository.administrador(id);
  }
}
