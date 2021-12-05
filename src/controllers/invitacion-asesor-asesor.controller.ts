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
  Asesor,
} from '../models';
import {InvitacionAsesorRepository} from '../repositories';

export class InvitacionAsesorAsesorController {
  constructor(
    @repository(InvitacionAsesorRepository)
    public invitacionAsesorRepository: InvitacionAsesorRepository,
  ) { }

  @get('/invitacion-asesors/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to InvitacionAsesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof InvitacionAsesor.prototype.id,
  ): Promise<Asesor> {
    return this.invitacionAsesorRepository.asesor(id);
  }
}
