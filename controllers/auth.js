const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");

const login = async (req, res= response)=>{
    
    const {correo, password} = req.body;

    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - correo'                
            });
        }
        
        //Si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/Password no son estado - false'                
            });
        }

        //Verificar la contraseña
        const validPasswrod=bcryptjs.compareSync(password,usuario.password);
        if(!validPasswrod){
            return res.status(400).json({
                msg:'Usuario/Password no son incorrectos - password'                
            });
        }


        //Generar el JWT
        console.log(usuario.id)
        const token = await generarJWT(usuario.id);


        return res.json({
            msg:'Login ok', 
            token,
            usuario
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el admin'
        })
    }


    
}

module.exports = {
    login
}