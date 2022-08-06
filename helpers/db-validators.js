const { Usuario, Categoria, Producto } = require('../models');
const Role = require('../models/rol');


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


const existeCategoria = async(id) =>{
    console.log(id)
    //const existeCategoriaDB = await Categoria.findById({_id:id});
    const existeCategoriaDB = await Categoria.findById({_id:id})
    console.log(existeCategoriaDB)


    if(!existeCategoriaDB){
      throw new Error(`La categoria ID ${id} no existe`);
    }
}


const existeProductoPorId = async(id) =>{
  console.log(id)
  //const existeCategoriaDB = await Categoria.findById({_id:id});
  const existeProductoDB = await Producto.findById({_id:id})
  console.log(existeProductoDB)


  if(!existeProductoDB){
    throw new Error(`La categoria ID ${id} no existe`);
  }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId
}