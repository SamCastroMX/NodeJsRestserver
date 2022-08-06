const { response } = require("express");
const { Categoria } = require("../models");


const obtenerCategorias = async(req, res= response)=>{

     const params=req.query;
     const {limit = 5, desde = 0} = params;

   
   const [total,categorias] = await Promise.all([
       Categoria.countDocuments({estado:true}),
       Categoria.find({estado:true})
       .populate('usuario','nombre')
       .skip(Number(desde))                        
       .limit(Number(limit))
     ]);
 
   res.send({total,categorias})
}

const obtenerCategoria = async(req, res = response) =>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id)
    .populate('usuario','nombre');

    return res.json(categoria);

}

const crearCategoria = async (req, res= response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);



}

const actualizarCategoria = async (req, res= response)=>{
    const {id } = req.params;

    const {usuario,estado, ...data} = req.body;

    data.nombre.toUpperCase();
    data.usuario=req.usuario.id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true});

    res.json(categoria);
}

const borrarCategoria = async (req,res=response) =>{
    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true});

    return res.json(categoriaBorrada)
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}