import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  EstadoAsesor,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorEstadoAsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/estado-asesor', {
    responses: {
      '200': {
        description: 'EstadoAsesor belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoAsesor)},
          },
        },
      },
    },
  })
  async getEstadoAsesor(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<EstadoAsesor> {
    return this.asesorRepository.estadoAsesor(id);
  }
}
