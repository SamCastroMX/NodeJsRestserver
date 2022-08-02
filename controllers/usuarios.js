const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('../middlewares/validar-campos');

const usuariosGet = async (req = request, res = response) => {

    //console.log(req.query)
    const params=req.query;
    const {limit = 5, desde = 0} = params;
/*
    const usuario = await Usuario.find({estado:true})
      .skip(Number(desde))                        
      .limit(Number(limit));

    const total = await Usuario.countDocuments({estado:true});
*/
 
  const [total,usuarios] = await Promise.all([
      Usuario.countDocuments({estado:true}),
      Usuario.find({estado:true})
      .skip(Number(desde))                        
      .limit(Number(limit))
    ]);

  res.send({total,usuarios})
//    res.send({total,usuario})
  }

  const usuariosPost = async (req, res = response) => {
       
    const {nombre,correo,password,rol} = req.body;
    const usuario =  new Usuario({nombre,correo,password,rol});
    
    //Verificar correo
    


    //Encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar DB
    
    await usuario.save();
    res.send({
        msg:"post API - controlador",
        usuario
    })
  }

  const usuariosPut = async (req, res = response) => {
    const id = req.params.id
    const {_id, password, google, ...resto} = req.body;
    
    //ToDo valida vs DD
    
    if(password){
      //Encriptar
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.send(usuario)
  }

  const usuariosPatch = (req, res = response) => {
    res.send({
        msg:"patch API - controlador"
    })
  }

  const usuariosDelete = async (req, res = response) => {
    const {id} =  req.params;
    
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.send({
      usuario
    })
  }

  

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }