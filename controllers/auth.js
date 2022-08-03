const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignIn = async(req,res = response) =>{
    
    const {id_token} = req.body;

    try {
        
        const {nombre, img, correo} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Crearlo
            const data = {
                nombre,
                correo,
                password:'0',
                rol:'ADMIN_ROLE',
                google:true,
                img
            }

            usuario = new Usuario(data);
            usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el admin - user bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);

        //console.log(goolgeUser)
        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg:'Token no se pudo verificar',
            id_token
        })
    }

}

module.exports = {
    login,
    googleSignIn
}