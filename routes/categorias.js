const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const {validarCampos, validarJWT, esAdminRole,tieneRole} = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoria } = require('../helpers/db-validators');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const categoria = require('../models/categoria');

const router = Router();

router.get('/', obtenerCategorias)

router.get('/:id', [
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria)

/*Privado */ 
router.post('/', [
    validarJWT,
    check('nombre','Se necesita el nombre').not().isEmpty(),
    validarCampos
    
],crearCategoria)

router.put('/:id', [
    validarJWT,
    check('nombre','Debe mandar nombre').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),

    validarCampos
],
borrarCategoria)

module.exports = router; 