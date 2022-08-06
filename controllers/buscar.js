const { response } = require("express");
const {ObjectId} = require("mongoose").Types;

const {Usuario, Categoria, Producto } = require('../models');
const usuario = require("../models/usuario");

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) =>{

    const esMongoId = ObjectId.isValid(termino);
    console.log(esMongoId)
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
       
        return res.status(200).json({results:(usuario) ? [usuario]:[]})
    }

    const regex = new RegExp(termino, 'i')
    const usuario = await Usuario.find({
        $or:[{nombre:regex}, {correo:regex}],
        $and: [{estado:true}]
    })
    
    return res.status(200).json({results:usuario})
}

const buscarCategorias = async(termino = '',res = response) =>{
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);

        return res.json({result:(categoria) ? [categoria]:[]});
    }

    const regex = new RegExp(termino,'i');

    const categoria = await Categoria.find({nombre:regex, estado:true});

    return res.json({result:categoria})
}

const buscarProducto = async(termino='',res = response)=>{
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        console.log(producto);
        return res.json({result:(producto)?[producto]:[]})
    }

    const regex = new RegExp(termino,'i');

    const producto = await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre');;

    return res.json({result:producto})
}

const buscar = async (req,res = response)=>{

    const {coleccion, termino} = req.params;


    console.log(coleccion,termino)

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colleciones permitidas son ${coleccionesPermitidas}`
        })
    }
    
    switch (coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino,res);
            break;

        case 'productos':
            buscarProducto(termino,res);
            break;

            default: return res.status(500).json({
                msg:'Falta busqueda'
            })
    }

    //return res.json({coleccion, termino})
}

module.exports= {
    buscar
}