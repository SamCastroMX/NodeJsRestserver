const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const cloudinary = require('cloudinary').v2
const { Usuario, Producto } = require('../models')

cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files);
        return res.json({ nombre });
    } catch (msg) {
        return res.status(400).json({ msg })
    }


    return res.json({ nombre })

}

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'No incluido' })
    }


    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            //Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

    modelo.img = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();

    res.json({
        modelo
    })


}

const mostrarImages = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'No incluido' })
    }


    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            //Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }



    const pathImagenNoImage = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagenNoImage)
}



const actualizarImagenCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'No incluido' })
    }


    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            //Hay que borrar la imagen del servidor
            //const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            
            cloudinary.uploader.destroy(public_id);

            // if (fs.existsSync(pathImagen)) {
            //     fs.unlinkSync(pathImagen);
            // }
        }


    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();

    res.json({
        modelo
    })


}



module.exports = { cargarArchivo, actualizarImagen, mostrarImages, actualizarImagenCloudinary };