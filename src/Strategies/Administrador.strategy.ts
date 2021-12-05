import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';


export class EstrategiaAdministrador implements AuthenticationStrategy {
    name: string = 'Administrador';
  
    constructor(
      @service(AutenticacionService)
      public servicioAutenticacion: AutenticacionService,
    ) {}
  
    async authenticate(request: Request): Promise<UserProfile | undefined> {
      let token = parseBearerToken(request);
      if (token) {
        let datos = await this.servicioAutenticacion.ValidarTokenJWT(token);
        if (datos) {
          if (datos) {
            let perfil: UserProfile = Object.assign({
              Nombre_completo: datos.data.Nombre_completo,
            });
            return perfil;
          } else {
            throw new HttpErrors[401]('No se ha incluido el token.');
          }
        } else {
          throw new HttpErrors[401]('Los datos ingresados no son válidos.');
        }
      }
    }
  }