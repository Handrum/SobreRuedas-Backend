import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Keys } from '../config/Keys';
import { Administrador, Asesor, Cliente } from '../models';
import { AdministradorRepository, AsesorRepository, ClienteRepository } from '../repositories';


const generador=require("password-generator");
const crypto=require("crypto-js");
const jwt=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public ClienteRepositorio:ClienteRepository
    ) {}
  
    @repository(AdministradorRepository)
    public AdministradorRepositorio:AdministradorRepository

    @repository(AsesorRepository)
    public AsesorRepositorio:AsesorRepository
  
  

  /*
   * Add service methods here
   */
  GenerarPassword(){
    let password=generador(6,false);
    return password;
  }

  CifrarPassword(password: String){
    let passwordCifrado=crypto.MD5(password).toString();
    return passwordCifrado;
  }

  IdentificarCliente(Usuario:string,clave:string){
    try{
      let Cliente=this.ClienteRepositorio.findOne({where:{Usuario: Usuario, Password:clave}});
      if(Cliente){
        return Cliente;
      }else{
        return false;
      }
    }catch{
      return false;

    }
    
  }
  GenerarTokenClienteJWT(Cliente:Cliente){
    let token=jwt.sign({
      data:{
        id:Cliente.id,
        Usuario:Cliente.Usuario,
        Nombre_completo:Cliente.Nombre_completo
      }
    },Keys.claveJWT
    );
    return token;
  }





  IdentificarAdministrador(Usuario:string,clave:string){
    try{
      let Administrador=this.AdministradorRepositorio.findOne({where:{Usuario:Usuario, Password:clave}});
      if(Administrador){
        return Administrador;
      }else{
        return false;
      }
    }catch{
      return false;

    }
    
  }
  GenerarTokenAdministradorJWT(Administrador:Administrador){
    let token=jwt.sign({
      data:{
        id:Administrador.id,
        Usuario:Administrador.Usuario,
        Nombre_completo:Administrador.Nombre_completo
      }
    },Keys.claveJWT
    );
    return token;
  }





  IdentificarAsesor(Usuario:string,clave:string){
    try{
      let Asesor=this.AsesorRepositorio.findOne({where:{Usuario: Usuario, Password:clave}});
      if(Asesor){
        return Asesor;
      }else{
        return false;
      }
    }catch{
      return false;

    }
    
  }
  GenerarAsesorTokenJWT(Asesor:Asesor){
    let token=jwt.sign({
      data:{
        id:Asesor.id,
        Usuario:Asesor.Usuario,
        Nombre_completo:Asesor.Nombre_completo
      }
    },Keys.claveJWT
    );
    return token;
  }





  ValidarTokenJWT(token:string){
    try{
      let datos=jwt.verify(token,Keys.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
