const { response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async(req, res= response)=>{

    const params=req.query;
    const {limit = 5, desde = 0} = params;

  
  const [total,productos] = await Promise.all([
      Producto.countDocuments({estado:true}),
      Producto.find({estado:true})
      .populate('usuario','nombre')
      .populate('categoria','nombre')
      .skip(Number(desde))                        
      .limit(Number(limit))
    ]);

  res.send({total,productos})
}

const obtenerProducto = async(req, res = response) =>{

    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    return res.json(producto);

}

const crearProducto = async (req, res= response)=>{

    const {estado, usuario,...body} = req.body;
    
    const productoDB = await Producto.findOne({nombre: body.nombre});

    console.log(body.nombre.toUpperCase(),productoDB)
    if(productoDB){
        return res.status(400).json({
            msg: `El Producto ${productoDB.nombre} ya existe`
        });
    }

    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body

    }

    const producto = await new Producto(data);

    await producto.save();

    res.status(201).json(producto);



}

const actualizarProducto = async (req, res= response)=>{
    const {id } = req.params;

    const {usuario,estado, ...data} = req.body;

    if(data.nombre){

        data.nombre.toUpperCase();
    }
    data.usuario=req.usuario.id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new: true});

    res.json(producto);         
}

const borrarProducto = async (req,res=response) =>{
    const {id} = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id, {estado:false},{new:true});

    return res.json(productoBorrada);
}

module.exports={
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto,
    obtenerProducto
}