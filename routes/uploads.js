const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImages, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c, ['usuarios','productos'])),
    validarCampos
//],actualizarImagen);
], actualizarImagenCloudinary);



router.get('/:coleccion/:id',[
    check('id','id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c, ['usuarios','productos'])),
    validarCampos
],mostrarImages)

module.exports = router;