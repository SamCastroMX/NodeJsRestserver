const { response } = require("express")

const esAdminRole = (req,res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere validar el role sin validar el token primero'
        })
    }
    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador -- No tienes permiso`
        })
    }

    next();
}

const tieneRole= (...roles) =>{

    //console.log(roles);



    return (req,res = response, next)=>{
    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg: `El servicio reqiere uno de estos ${roles}`
        })
    }
    
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}