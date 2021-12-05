import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {Keys} from '../config/Keys';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/autenticarCliente', {
    responses: {
      '200': {
        description: 'Autenticación de Usuarios',
      },
    },
  })
  async autenticarCliente(@requestBody() credenciales: Credenciales) {
    let Cliente = await this.servicioAutenticacion.IdentificarCliente(
      credenciales.Usuario,
      credenciales.Password,
    );
    if (Cliente) {
      let token = this.servicioAutenticacion.GenerarTokenClienteJWT(Cliente);
      return {
        datos: {
          Nombre_completo: Cliente.Nombre_completo,
          Usuario: Cliente.Usuario,
          id: Cliente.id,
          rol: 'Usuario Cliente',
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('Los datos ingresados no son válidos.');
    }
  }

  @post('/Clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    //creamos una contraseña aleatoria
    let password = this.servicioAutenticacion.GenerarPassword();
    //ciframos la contraseña
    let passwordCifrado = this.servicioAutenticacion.CifrarPassword(password);
    cliente.Password = passwordCifrado;
    let Client = await this.clienteRepository.create(cliente);
    //envío de notificación al correo
    let email = cliente.Usuario;
    let asunto = `Bienvenidos ${cliente.Nombre_completo} a Sobre Ruedas`;
    let mensaje = `<p>Hola ${cliente.Nombre_completo}, te damos la Bienvenida a la plataforma <strong>Sobre Ruedas</strong> Debes usar los siguientes datos para ingresar</p>
                <p>Usuario: ${cliente.Usuario}</p>
                <p>Password: ${password}</p>`;

    //fetch ("http://127.0.0.1:5000/email?email="+correo+"&subject="+asunto+"&message="+mensaje)
    // .then((data: any) => {
    //    console.log(data);
    //  });

    fetch(
      `${Keys.urlSrvNotificacion}?email=${email}&subject=${asunto}&message=${mensaje}`,
    ).then((data: any) => {
      console.log(data);
    });
    return Client;
  }

  @get('/Clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Cliente) where?: Where<Cliente>): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/Clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/Clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/Clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'})
    filter?: FilterExcludingWhere<Cliente>,
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/Clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/Clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/Clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
