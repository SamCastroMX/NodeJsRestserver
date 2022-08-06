const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const {validarCampos, validarJWT, esAdminRole,tieneRole} = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoria, existeProductoPorId } = require('../helpers/db-validators');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const Producto = require('../models/producto');
const { crearProducto, obtenerProductos, obtenerProducto,actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

/*Privado */ 
router.post('/', [
    validarJWT,
    check('nombre','Se necesita el nombre').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos    
],crearProducto)

router.put('/:id', [
    validarJWT,    
    check('id','No es un id de mongo').isMongoId(),    
    //check('id').custom(existeCategoria),
    validarCampos
],actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),

    validarCampos
],
borrarProducto)

module.exports = router; 