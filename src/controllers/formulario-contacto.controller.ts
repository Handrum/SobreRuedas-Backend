import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FormularioContacto} from '../models';
import {FormularioContactoRepository} from '../repositories';

export class FormularioContactoController {
  constructor(
    @repository(FormularioContactoRepository)
    public formularioContactoRepository : FormularioContactoRepository,
  ) {}

  @post('/Formulario-Contactos')
  @response(200, {
    description: 'FormularioContacto model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormularioContacto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioContacto, {
            title: 'NewFormularioContacto',
            exclude: ['id'],
          }),
        },
      },
    })
    formularioContacto: Omit<FormularioContacto, 'id'>,
  ): Promise<FormularioContacto> {
    return this.formularioContactoRepository.create(formularioContacto);
  }

  @get('/Formulario-Contactos/count')
  @response(200, {
    description: 'FormularioContacto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FormularioContacto) where?: Where<FormularioContacto>,
  ): Promise<Count> {
    return this.formularioContactoRepository.count(where);
  }

  @get('/Formulario-Contactos')
  @response(200, {
    description: 'Array of FormularioContacto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FormularioContacto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FormularioContacto) filter?: Filter<FormularioContacto>,
  ): Promise<FormularioContacto[]> {
    return this.formularioContactoRepository.find(filter);
  }

  @patch('/Formulario-Contactos')
  @response(200, {
    description: 'FormularioContacto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioContacto, {partial: true}),
        },
      },
    })
    formularioContacto: FormularioContacto,
    @param.where(FormularioContacto) where?: Where<FormularioContacto>,
  ): Promise<Count> {
    return this.formularioContactoRepository.updateAll(formularioContacto, where);
  }

  @get('/Formulario-Contactos/{id}')
  @response(200, {
    description: 'FormularioContacto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FormularioContacto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FormularioContacto, {exclude: 'where'}) filter?: FilterExcludingWhere<FormularioContacto>
  ): Promise<FormularioContacto> {
    return this.formularioContactoRepository.findById(id, filter);
  }

  @patch('/Formulario-Contactos/{id}')
  @response(204, {
    description: 'FormularioContacto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioContacto, {partial: true}),
        },
      },
    })
    formularioContacto: FormularioContacto,
  ): Promise<void> {
    await this.formularioContactoRepository.updateById(id, formularioContacto);
  }

  @put('/Formulario-Contactos/{id}')
  @response(204, {
    description: 'FormularioContacto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() formularioContacto: FormularioContacto,
  ): Promise<void> {
    await this.formularioContactoRepository.replaceById(id, formularioContacto);
  }

  @del('/Formulario-Contactos/{id}')
  @response(204, {
    description: 'FormularioContacto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.formularioContactoRepository.deleteById(id);
  }
}
