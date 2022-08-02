const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido =  async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El Rol ${rol} no esta registrado en la DB`)
    }
}


const emailExiste =async (correo='') => {
    
    const existeEmail = await Usuario.findOne({correo});
    //return existeEmail;
    if(existeEmail){
      throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) =>{
    const existeUsuario = await Usuario.findById({_id:id});

    if(!existeUsuario){
      throw new Error(`El ID ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}